# Michael Paulukonis
# 20102.10.15
# clone a given set of sketch files

# given a root filename (eg, "004" or "005a")
# and a new filename
# copy the main variants -- .html, .css, .js
# into the new variants
# check for existence of originals
# and no collisions with pre-existing destination files

use strict;
use warnings;

use Getopt::Long;
use Data::Dumper;
use File::Copy;
use File::Path;

use feature "switch";

use Win32::TieRegistry(Delimiter=>"/");
use Win32::API;

my ($source,$target,$action) = "";
my $help = 0;

GetOptions ("help|?"            => \$help,
            "source:s"          => \$source,
            "target:s"          => \$target
            # "action:s"          => \$action,
            # for now, assume all actions are CLONE
           );

# ugh. This needs to be rewritten. STAT.
# well, after OTHER "stat" items....

if ($help) {

  help();

} else {


  my $rootHtml = 'd:\\Dropbox\\projects\\WebText\\';
  my $rootJs = 'd:\\Dropbox\\projects\\WebText\\javascript\\pages\\';
  my $rootCss = 'd:\\Dropbox\\projects\\WebText\\css\\pages\\';

  my %source = (
                'html' => $rootHtml.$source.'.html',
                'javascript' => $rootJs.$source.'.js',
                'css' => $rootCss.$source.'.css'
               );

  my %targ = (
              'html' => $rootHtml.$target.'.html',
              'javascript' => $rootJs.$target.'.js',
              'css' => $rootCss.$target.'.css'
             );

  print Dumper "target: $target";
  print Dumper \%source;
  print Dumper \%targ;
  print "html is ".$source{'html'};


  if (files_exist(\%source)) {
    print "source files exist!\n\n";
  } else {
    die "source files missing.";
  }


  if (files_exist(\%targ)) {
    die "target files exist. ABORT ABORT!!";
  } else {
    print "target files missing (hooray!)\n\n";
  }

  foreach my $f (keys %source) {
    copy($source{$f},$targ{$f}) or die "Copy failed: $!";
  }

  print "\nCLONED!\n";

  # TODO: update inner portions of $targ('html') to ref the correct js and css
  print "... updating html....\n";

  update_html($rootHtml, $target.'.html', $source, $target);

}

1;                              # exit app after parsing options


sub update_html {

  my ($rootHtml, $filename, $source, $target) = @_;

  print "source: $source target: $target\n";

  my $basename = $rootHtml.$filename;
  my $tempname = $rootHtml."new_".$filename;

  open INPUT, "< $basename" or die "Cannot open input ($basename): $!";
  my @lines = <INPUT>;
  close INPUT;

  # $filename is coming in as a complete path
  # so.... this doesn't work so well...
  open OUTPUT, "> $tempname" or die "Canot open output ($tempname): $!";

  # modify the two following cloned lines to point to the new file...
  # <script src="./javascript/007a.js" type="text/javascript"></script>
  # <link href="./css/007a.css" rel="stylesheet" type="text/css" />

  foreach my $line (@lines) {
    chomp $line;
    if ($line =~ /$source\.js/) {
      print "found javascript: $line\n";
      $line =~ s/$source/$target/;
      print "post replace: $line\n";
    } elsif ($line =~ /$source\.css/) {
      print "found css: $line\n";
      $line =~ s/$source/$target/;
      print "post replace: $line\n";
    }
    print OUTPUT "$line\n";
  }

  close OUTPUT;

  print " - removing $basename\n";
  unlink $basename;
  print " - renaming $tempname\n";
  rename ($tempname, $basename);

  print "replacements complete\n";

}

sub files_exist {

  my ($f) = @_;
  my %files = %{$f};
  my $exists = 0;

  # print Dumper(\%files);
  # print "html is ".$files{'html'}."\n\n";

  $exists = (-e $files{'html'})
    && (-e $files{'javascript'})
      && (-e $files{'css'});

  return $exists;

}

sub help {

  print "useage: 'clone.pls --source=nnn --target=mmm'";

}
