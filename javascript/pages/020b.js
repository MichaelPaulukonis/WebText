$(document).ready(function() {

    page20();

});



var page20 = function() {

    var opts = {};

    opts.model = 'markov';
    opts.ngramlength = 3;
    opts.inputString = getText(); // only ever set ONCE

    var w = new markov(opts);


    var drawText = function(txt, id) {

        var draw = SVG(id).size(161, 196);

        var text = draw.text(txt);

        // the text/box size is a bit larger for 020.html
        // use that - reads better.
        text.font({
            family: 'Droid Sans Mono'
            , size: '13px'
            , anchor: 'right'
            , leading: '1.5em'
            , fill: 'white'
        });

    };


    var getBlobText = function() {

        w.Text = getText();
        var text = w.GetNchars(199); // I think the count is off-by-one!!! aaaargh

        // uh. I dunno. I've tried several lengths
        // but it doesn't really work unless there's some vertical movement
        // pad all spaces with dots and break
        // TODO: variable-length spaces (w/in reason)
        // var frags = text.split(/\s+/g);
        // var blob = '';
        // for (var i = 0; i < frags.length; i++) {
        //     var t = Math.floor(Math.random() * 5) + 1;
        //     var dots = Array(t+1).join('.');
        //     console.log('count: ' + t + '{' + dots + '}');
        //     blob += frags[i] + dots;
        // }
        // blob = blob.substring(0,200);

        var blob = text.replace(/\s/g, '.');
        var lines = blob.match(/.{1,20}/g).join('\r\n');

        return lines;

    };

    var tileFill = function($element, col, row) {

        var lines = getBlobText();

        var id = 'col' + col + 'row' + row;
        var canvas = "<div class='colrow' id='" + id + "'></div>";
        $element.html(canvas);

        drawText(lines, id);

    };

    // The oncreate function is called every time a tile is created.
    var wall = jQuery.infinitedrag("#wall", {}, {
        // THESE CANNOT BE POINTS
        // because the numbers are used for math (position offset)
        // maybe look @ http://stackoverflow.com/questions/139655/convert-pixels-to-points
        // on my work machine
        width: 161,
	height: 194,
        // on my personal machine
        // width: 193,
        // height: 190,
	start_col: 0,
	start_row: 0,
        oncreate: function($element, col, row) { tileFill($element, col, row); }
    });

    wall.center(0, 0);

    $('#infobox').fadeOut(3000);

    $('#viewport').center();




};

var getText = function() {

    var badstein = "as an apple is to a beta, this bridge is over the any hill. who says? she says! so says the soothsayer rapunzel. As Brad the Bard and Ken knew, the can-can can not know how to do it like an apple, like a bridge, like a beast of burden with a heavy load. And so what? The bald bearded bard sings a braided tale of happiness, of woe, of bitter embargoed apples on a barge passing under a bridegroom's bridge by a tepid, vapid moon. His beer is here, and all ale is well, hale, and hearty. This is not my bridge, it is your bridge, your toll bridge, your tool for trolls and travellers. I see you singing, Bradley Bard, I hear you. Your embalmer blames the bridge, his badge is barely adequate for the aqueduct, he ducks his dock responsibilities badly, baldly. Who is the third that walks beside you? How is he known, and how can he see in the dark (if, in fact, he can.) All what? All right, that is okay, he said.";

    var shakespeare = "// William Shakespeare - The Sonnets " +
        "From fairest creatures we desire increase, " +
        "That thereby beauty's rose might never die, " +
        "But as the riper should by time decease, " +
        "His tender heir might bear his memory: " +
        "But thou contracted to thine own bright eyes, " +
        "Feed'st thy light's flame with self-substantial fuel, " +
        "Making a famine where abundance lies, " +
        "Thy self thy foe, to thy sweet self too cruel: " +
        "Thou that art now the world's fresh ornament, " +
        "And only herald to the gaudy spring, " +
        "Within thine own bud buriest thy content, " +
        "And tender churl mak'st waste in niggarding: " +
        "  Pity the world, or else this glutton be, " +
        "  To eat the world's due, by the grave and thee. " +
        "When forty winters shall besiege thy brow, " +
        "And dig deep trenches in thy beauty's field, " +
        "Thy youth's proud livery so gazed on now, " +
        "Will be a tatter'd weed of small worth held: " +
        "Then being asked, where all thy beauty lies, " +
        "Where all the treasure of thy lusty days; " +
        "To say, within thine own deep sunken eyes, " +
        "Were an all-eating shame, and thriftless praise. " +
        "How much more praise deserv'd thy beauty's use, " +
        "If thou couldst answer This fair child of mine " +
        "Shall sum my count, and make my old excuse, " +
        "Proving his beauty by succession thine! " +
        "  This were to be new made when thou art old, " +
        "  And see thy blood warm when thou feel'st it cold. " +
        "Look in thy glass and tell the face thou viewest " +
        "Now is the time that face should form another; " +
        "Whose fresh repair if now thou not renewest, " +
        "Thou dost beguile the world, unbless some mother. " +
        "For where is she so fair whose unear'd womb " +
        "Disdains the tillage of thy husbandry? " +
        "Or who is he so fond will be the tomb, " +
        "Of his self-love to stop posterity? " +
        "Thou art thy mother's glass and she in thee " +
        "Calls back the lovely April of her prime; " +
        "So thou through windows of thine age shalt see, " +
        "Despite of wrinkles this thy golden time. " +
        "  But if thou live, remember'd not to be, " +
        "  Die single and thine image dies with thee. " +
        "Unthrifty loveliness, why dost thou spend " +
        "Upon thy self thy beauty's legacy? " +
        "Nature's bequest gives nothing, but doth lend, " +
        "And being frank she lends to those are free: " +
        "Then, beauteous niggard, why dost thou abuse " +
        "The bounteous largess given thee to give? " +
        "Profitless usurer, why dost thou use " +
        "So great a sum of sums, yet canst not live? " +
        "For having traffic with thy self alone, " +
        "Thou of thy self thy sweet self dost deceive: " +
        "Then how when nature calls thee to be gone, " +
        "What acceptable audit canst thou leave? " +
        "  Thy unused beauty must be tombed with thee, " +
        "  Which, used, lives th executor to be. " +
        "Those hours, that with gentle work did frame " +
        "The lovely gaze where every eye doth dwell, " +
        "Will play the tyrants to the very same " +
        "And that unfair which fairly doth excel; " +
        "For never-resting time leads summer on " +
        "To hideous winter, and confounds him there; " +
        "Sap checked with frost, and lusty leaves quite gone, " +
        "Beauty o'er-snowed and bareness every where: " +
        "Then were not summer's distillation left, " +
        "A liquid prisoner pent in walls of glass, " +
        "Beauty's effect with beauty were bereft, " +
        "Nor it, nor no remembrance what it was: " +
        "  But flowers distill'd, though they with winter meet, " +
        "  Leese but their show; their substance still lives sweet. " +
        "Then let not winter's ragged hand deface, " +
        "In thee thy summer, ere thou be distill'd: " +
        "Make sweet some vial; treasure thou some place " +
        "With beauty's treasure ere it be self-kill'd. " +
        "That use is not forbidden usury, " +
        "Which happies those that pay the willing loan; " +
        "That's for thy self to breed another thee, " +
        "Or ten times happier, be it ten for one; " +
        "Ten times thy self were happier than thou art, " +
        "If ten of thine ten times refigur'd thee: " +
        "Then what could death do if thou shouldst depart, " +
        "Leaving thee living in posterity? " +
        "  Be not self-will'd, for thou art much too fair " +
        "  To be death's conquest and make worms thine heir. " +
        "Lo! in the orient when the gracious light " +
        "Lifts up his burning head, each under eye " +
        "Doth homage to his new-appearing sight, " +
        "Serving with looks his sacred majesty; " +
        "And having climb'd the steep-up heavenly hill, " +
        "Resembling strong youth in his middle age, " +
        "Yet mortal looks adore his beauty still, " +
        "Attending on his golden pilgrimage: " +
        "But when from highmost pitch, with weary car, " +
        "Like feeble age, he reeleth from the day, " +
        "The eyes, fore duteous, now converted are " +
        "From his low tract, and look another way: " +
        "  So thou, thyself outgoing in thy noon: " +
        "  Unlook'd, on diest unless thou get a son. " +
        "Music to hear, why hear'st thou music sadly? " +
        "Sweets with sweets war not, joy delights in joy: " +
        "Why lov'st thou that which thou receiv'st not gladly, " +
        "Or else receiv'st with pleasure thine annoy? " +
        "If the true concord of well-tuned sounds, " +
        "By unions married, do offend thine ear, " +
        "They do but sweetly chide thee, who confounds " +
        "In singleness the parts that thou shouldst bear. " +
        "Mark how one string, sweet husband to another, " +
        "Strikes each in each by mutual ordering; " +
        "Resembling sire and child and happy mother, " +
        "Who, all in one, one pleasing note do sing: " +
        "  Whose speechless song being many, seeming one, " +
        "  Sings this to thee: Thou single wilt prove none. " +
        "Is it for fear to wet a widow's eye, " +
        "That thou consum'st thy self in single life? " +
        "Ah! if thou issueless shalt hap to die, " +
        "The world will wail thee like a makeless wife; " +
        "The world will be thy widow and still weep " +
        "That thou no form of thee hast left behind, " +
        "When every private widow well may keep " +
        "By children's eyes, her husband's shape in mind: " +
        "Look! what an unthrift in the world doth spend " +
        "Shifts but his place, for still the world enjoys it; " +
        "But beauty's waste hath in the world an end, " +
        "And kept unused the user so destroys it. " +
        "  No love toward others in that bosom sits " +
        "  That on himself such murd'rous shame commits. " +
        "For shame! deny that thou bear'st love to any, " +
        "Who for thy self art so unprovident. " +
        "Grant, if thou wilt, thou art belov'd of many, " +
        "But that thou none lov'st is most evident: " +
        "For thou art so possess'd with murderous hate, " +
        "That gainst thy self thou stick'st not to conspire, " +
        "Seeking that beauteous roof to ruinate " +
        "Which to repair should be thy chief desire. " +
        "O! change thy thought, that I may change my mind: " +
        "Shall hate be fairer lodg'd than gentle love? " +
        "Be, as thy presence is, gracious and kind, " +
        "Or to thyself at least kind-hearted prove: " +
        "  Make thee another self for love of me, " +
        "  That beauty still may live in thine or thee. " +
        "As fast as thou shalt wane, so fast thou grow'st, " +
        "In one of thine, from that which thou departest; " +
        "And that fresh blood which youngly thou bestow'st, " +
        "Thou mayst call thine when thou from youth convertest, " +
        "Herein lives wisdom, beauty, and increase; " +
        "Without this folly, age, and cold decay: " +
        "If all were minded so, the times should cease " +
        "And threescore year would make the world away. " +
        "Let those whom nature hath not made for store, " +
        "Harsh, featureless, and rude, barrenly perish: " +
        "Look, whom she best endow'd, she gave thee more; " +
        "Which bounteous gift thou shouldst in bounty cherish: " +
        "  She carv'd thee for her seal, and meant thereby, " +
        "  Thou shouldst print more, not let that copy die. " +
        "When I do count the clock that tells the time, " +
        "And see the brave day sunk in hideous night; " +
        "When I behold the violet past prime, " +
        "And sable curls, all silvered o'er with white; " +
        "When lofty trees I see barren of leaves, " +
        "Which erst from heat did canopy the herd, " +
        "And summer's green all girded up in sheaves, " +
        "Borne on the bier with white and bristly beard, " +
        "Then of thy beauty do I question make, " +
        "That thou among the wastes of time must go, " +
        "Since sweets and beauties do themselves forsake " +
        "And die as fast as they see others grow; " +
        "  And nothing gainst Time's scythe can make defence " +
        "  Save breed, to brave him when he takes thee hence. " +
        "O! that you were your self; but, love you are " +
        "No longer yours, than you your self here live: " +
        "Against this coming end you should prepare, " +
        "And your sweet semblance to some other give: " +
        "So should that beauty which you hold in lease " +
        "Find no determination; then you were " +
        "Yourself again, after yourself's decease, " +
        "When your sweet issue your sweet form should bear. " +
        "Who lets so fair a house fall to decay, " +
        "Which husbandry in honour might uphold, " +
        "Against the stormy gusts of winter's day " +
        "And barren rage of death's eternal cold? " +
        "  O! none but unthrifts. Dear my love, you know, " +
        "  You had a father: let your son say so. " +
        "Not from the stars do I my judgement pluck; " +
        "And yet methinks I have astronomy, " +
        "But not to tell of good or evil luck, " +
        "Of plagues, of dearths, or seasons quality; " +
        "Nor can I fortune to brief minutes tell, " +
        "Pointing to each his thunder, rain and wind, " +
        "Or say with princes if it shall go well " +
        "By oft predict that I in heaven find: " +
        "But from thine eyes my knowledge I derive, " +
        "And constant stars in them I read such art " +
        "As Truth and beauty shall together thrive, " +
        "If from thyself, to store thou wouldst convert'; " +
        "  Or else of thee this I prognosticate: " +
        "  Thy end is truth's and beauty's doom and date. " +
        "When I consider every thing that grows " +
        "Holds in perfection but a little moment, " +
        "That this huge stage presenteth nought but shows " +
        "Whereon the stars in secret influence comment; " +
        "When I perceive that men as plants increase, " +
        "Cheered and checked even by the self-same sky, " +
        "Vaunt in their youthful sap, at height decrease, " +
        "And wear their brave state out of memory; " +
        "Then the conceit of this inconstant stay " +
        "Sets you most rich in youth before my sight, " +
        "Where wasteful Time debateth with decay " +
        "To change your day of youth to sullied night, " +
        "  And all in war with Time for love of you, " +
        "  As he takes from you, I engraft you new. " +
        "But wherefore do not you a mightier way " +
        "Make war upon this bloody tyrant, Time? " +
        "And fortify your self in your decay " +
        "With means more blessed than my barren rhyme? " +
        "Now stand you on the top of happy hours, " +
        "And many maiden gardens, yet unset, " +
        "With virtuous wish would bear you living flowers, " +
        "Much liker than your painted counterfeit: " +
        "So should the lines of life that life repair, " +
        "Which this, Time's pencil, or my pupil pen, " +
        "Neither in inward worth nor outward fair, " +
        "Can make you live your self in eyes of men. " +
        "  To give away yourself, keeps yourself still, " +
        "  And you must live, drawn by your own sweet skill. " +
        "Who will believe my verse in time to come, " +
        "If it were fill'd with your most high deserts? " +
        "Though yet heaven knows it is but as a tomb " +
        "Which hides your life, and shows not half your parts. " +
        "If I could write the beauty of your eyes, " +
        "And in fresh numbers number all your graces, " +
        "The age to come would say This poet lies; " +
        "Such heavenly touches ne'er touch'd earthly faces. " +
        "So should my papers, yellow'd with their age, " +
        "Be scorn'd, like old men of less truth than tongue, " +
        "And your true rights be term'd a poet's rage " +
        "And stretched metre of an antique song: " +
        "  But were some child of yours alive that time, " +
        "  You should live twice,--in it, and in my rhyme. " +
        "Shall I compare thee to a summer's day? " +
        "Thou art more lovely and more temperate: " +
        "Rough winds do shake the darling buds of May, " +
        "And summer's lease hath all too short a date: " +
        "Sometime too hot the eye of heaven shines, " +
        "And often is his gold complexion dimm'd, " +
        "And every fair from fair sometime declines, " +
        "By chance, or nature's changing course untrimm'd: " +
        "But thy eternal summer shall not fade, " +
        "Nor lose possession of that fair thou ow'st, " +
        "Nor shall death brag thou wander'st in his shade, " +
        "When in eternal lines to time thou grow'st, " +
        "  So long as men can breathe, or eyes can see, " +
        "  So long lives this, and this gives life to thee. " +
        "Devouring Time, blunt thou the lion's paws, " +
        "And make the earth devour her own sweet brood; " +
        "Pluck the keen teeth from the fierce tiger's jaws, " +
        "And burn the long-liv'd phoenix, in her blood; " +
        "Make glad and sorry seasons as thou fleets, " +
        "And do whate'er thou wilt, swift-footed Time, " +
        "To the wide world and all her fading sweets; " +
        "But I forbid thee one most heinous crime: " +
        "O! carve not with thy hours my love's fair brow, " +
        "Nor draw no lines there with thine antique pen; " +
        "Him in thy course untainted do allow " +
        "For beauty's pattern to succeeding men. " +
        "  Yet, do thy worst old Time: despite thy wrong, " +
        "  My love shall in my verse ever live young. " +
        "A woman's face with nature's own hand painted, " +
        "Hast thou, the master mistress of my passion; " +
        "A woman's gentle heart, but not acquainted " +
        "With shifting change, as is false women's fashion: " +
        "An eye more bright than theirs, less false in rolling, " +
        "Gilding the object whereupon it gazeth; " +
        "A man in hue all hues in his controlling, " +
        "Which steals men's eyes and women's souls amazeth. " +
        "And for a woman wert thou first created; " +
        "Till Nature, as she wrought thee, fell a-doting, " +
        "And by addition me of thee defeated, " +
        "By adding one thing to my purpose nothing. " +
        "  But since she prick'd thee out for women's pleasure, " +
        "  Mine be thy love and thy love's use their treasure. " +
        "So is it not with me as with that Muse, " +
        "Stirr'd by a painted beauty to his verse, " +
        "Who heaven itself for ornament doth use " +
        "And every fair with his fair doth rehearse, " +
        "Making a couplement of proud compare " +
        "With sun and moon, with earth and sea's rich gems, " +
        "With April's first-born flowers, and all things rare, " +
        "That heaven's air in this huge rondure hems. " +
        "O! let me, true in love, but truly write, " +
        "And then believe me, my love is as fair " +
        "As any mother's child, though not so bright " +
        "As those gold candles fix'd in heaven's air: " +
        "  Let them say more that like of hearsay well; " +
        "  I will not praise that purpose not to sell. " +
        "My glass shall not persuade me I am old, " +
        "So long as youth and thou are of one date; " +
        "But when in thee time's furrows I behold, " +
        "Then look I death my days should expiate. " +
        "For all that beauty that doth cover thee, " +
        "Is but the seemly raiment of my heart, " +
        "Which in thy breast doth live, as thine in me: " +
        "How can I then be elder than thou art? " +
        "O! therefore love, be of thyself so wary " +
        "As I, not for myself, but for thee will; " +
        "Bearing thy heart, which I will keep so chary " +
        "As tender nurse her babe from faring ill. " +
        "  Presume not on th;heart when mine is slain, " +
        "  Thou gav'st me thine not to give back again. " +
        "As an unperfect actor on the stage, " +
        "Who with his fear is put beside his part, " +
        "Or some fierce thing replete with too much rage, " +
        "Whose strength's abundance weakens his own heart; " +
        "So I, for fear of trust, forget to say " +
        "The perfect ceremony of love's rite, " +
        "And in mine own love's strength seem to decay, " +
        "O'ercharg'd with burthen of mine own love's might. " +
        "O! let my looks be then the eloquence " +
        "And dumb presagers of my speaking breast, " +
        "Who plead for love, and look for recompense, " +
        "More than that tongue that more hath more express'd. " +
        "  O! learn to read what silent love hath writ: " +
        "  To hear with eyes belongs to love's fine wit. " +
        "Mine eye hath play'd the painter and hath stell'd, " +
        "Thy beauty's form in table of my heart; " +
        "My body is the frame wherein tis held, " +
        "And perspective it is best painter's art. " +
        "For through the painter must you see his skill, " +
        "To find where your true image pictur'd lies, " +
        "Which in my bosom's shop is hanging still, " +
        "That hath his windows glazed with thine eyes. " +
        "Now see what good turns eyes for eyes have done: " +
        "Mine eyes have drawn thy shape, and thine for me " +
        "Are windows to my breast, where-through the sun " +
        "Delights to peep, to gaze therein on thee; " +
        "  Yet eyes this cunning want to grace their art, " +
        "  They draw but what they see, know not the heart. " +
        "Let those who are in favour with their stars " +
        "Of public honour and proud titles boast, " +
        "Whilst I, whom fortune of such triumph bars " +
        "Unlook'd for joy in that I honour most. " +
        "Great princes favourites their fair leaves spread " +
        "But as the marigold at the sun's eye, " +
        "And in themselves their pride lies buried, " +
        "For at a frown they in their glory die. " +
        "The painful warrior famoused for fight, " +
        "After a thousand victories once foil'd, " +
        "Is from the book of honour razed quite, " +
        "And all the rest forgot for which he toil'd: " +
        "Then happy I, that love and am belov'd, " +
        "Where I may not remove nor be remov'd. " +
        "Lord of my love, to whom in vassalage " +
        "Thy merit hath my duty strongly knit, " +
        "To thee I send this written embassage, " +
        "To witness duty, not to show my wit: " +
        "Duty so great, which wit so poor as mine " +
        "May make seem bare, in wanting words to show it, " +
        "But that I hope some good conceit of thine " +
        "In thy soul's thought, all naked, will bestow it: " +
        "Till whatsoever star that guides my moving, " +
        "Points on me graciously with fair aspect, " +
        "And puts apparel on my tatter'd loving, " +
        "To show me worthy of thy sweet respect: " +
        "  Then may I dare to boast how I do love thee; " +
        "  Till then, not show my head where thou mayst prove me. " +
        "Weary with toil, I haste me to my bed, " +
        "The dear respose for limbs with travel tir'd; " +
        "But then begins a journey in my head " +
        "To work my mind, when body's work's expired: " +
        "For then my thoughts--from far where I abide-- " +
        "Intend a zealous pilgrimage to thee, " +
        "And keep my drooping eyelids open wide, " +
        "Looking on darkness which the blind do see: " +
        "Save that my soul's imaginary sight " +
        "Presents thy shadow to my sightless view, " +
        "Which, like a jewel (hung in ghastly night, " +
        "Makes black night beauteous, and her old face new. " +
        "  Lo! thus, by day my limbs, by night my mind, " +
        "  For thee, and for myself, no quiet find. " +
        "How can I then return in happy plight, " +
        "That am debarre'd the benefit of rest? " +
        "When day's oppression is not eas'd by night, " +
        "But day by night and night by day oppress'd, " +
        "And each, though enemies to either's reign, " +
        "Do in consent shake hands to torture me, " +
        "The one by toil, the other to complain " +
        "How far I toil, still farther off from thee. " +
        "I tell the day, to please him thou art bright, " +
        "And dost him grace when clouds do blot the heaven: " +
        "So flatter I the swart-complexion'd night, " +
        "When sparkling stars twire not thou gild'st the even. " +
        "  But day doth daily draw my sorrows longer, " +
        "  And night doth nightly make grief's length seem stronger. " +
        "When in disgrace with fortune and men's eyes " +
        "I all alone beweep my outcast state, " +
        "And trouble deaf heaven with my bootless cries, " +
        "And look upon myself, and curse my fate, " +
        "Wishing me like to one more rich in hope, " +
        "Featur'd like him, like him with friends possess'd, " +
        "Desiring this man's art, and that man's scope, " +
        "With what I most enjoy contented least; " +
        "Yet in these thoughts my self almost despising, " +
        "Haply I think on thee,-- and then my state, " +
        "Like to the lark at break of day arising " +
        "From sullen earth, sings hymns at heaven's gate,; " +
        "  For thy sweet love remember'd such wealth brings " +
        "  That then I scorn to change my state with kings. " +
        "When to the sessions of sweet silent thought " +
        "I summon up remembrance of things past, " +
        "I sigh the lack of many a thing I sought, " +
        "And with old woes new wail my dear time's waste: " +
        "Then can I drown an eye, unused to flow, " +
        "For precious friends hid in death's dateless night, " +
        "And weep afresh love's long since cancell'd woe, " +
        "And moan the expense of many a vanish'd sight: " +
        "Then can I grieve at grievances foregone, " +
        "And heavily from woe to woe tell o'er " +
        "The sad account of fore-bemoaned moan, " +
        "Which I new pay as if not paid before. " +
        "  But if the while I think on thee, dear friend, " +
        "  All losses are restor'd and sorrows end. " +
        "Thy bosom is endeared with all hearts, " +
        "Which I by lacking have supposed dead; " +
        "And there reigns Love, and all Love's loving parts, " +
        "And all those friends which I thought buried. " +
        "How many a holy and obsequious tear " +
        "Hath dear religious love stol'n from mine eye, " +
        "As interest of the dead, which now appear " +
        "But things remov'd that hidden in thee lie! " +
        "Thou art the grave where buried love doth live, " +
        "Hung with the trophies of my lovers gone, " +
        "Who all their parts of me to thee did give, " +
        "That due of many now is thine alone: " +
        "  Their images I lov'd, I view in thee, " +
        "  And thou--all they--hast all the all of me. " +
        "If thou survive my well-contented day, " +
        "When that churl Death my bones with dust shall cover " +
        "And shalt by fortune once more re-survey " +
        "These poor rude lines of thy deceased lover, " +
        "Compare them with the bett'ring of the time, " +
        "And though they be outstripp'd by every pen, " +
        "Reserve them for my love, not for their rhyme, " +
        "Exceeded by the height of happier men. " +
        "O! then vouchsafe me but this loving thought: " +
        "Had my friend's Muse grown with this growing age, " +
        "A dearer birth than this his love had brought, " +
        "To march in ranks of better equipage: " +
        "  But since he died and poets better prove, " +
        "  Theirs for their style I'll read, his for his love'. " +
        "Full many a glorious morning have I seen " +
        "Flatter the mountain tops with sovereign eye, " +
        "Kissing with golden face the meadows green, " +
        "Gilding pale streams with heavenly alchemy; " +
        "Anon permit the basest clouds to ride " +
        "With ugly rack on his celestial face, " +
        "And from the forlorn world his visage hide, " +
        "Stealing unseen to west with this disgrace: " +
        "Even so my sun one early morn did shine, " +
        "With all triumphant splendour on my brow; " +
        "But out! alack! he was but one hour mine, " +
        "The region cloud hath mask'd him from me now. " +
        "  Yet him for this my love no whit disdaineth; " +
        "  Suns of the world may stain when heaven's sun staineth. " +
        "Why didst thou promise such a beauteous day, " +
        "And make me travel forth without my cloak, " +
        "To let base clouds o'ertake me in my way, " +
        "Hiding thy bravery in their rotten smoke? " +
        "Tis not enough that through the cloud thou break, " +
        "To dry the rain on my storm-beaten face, " +
        "For no man well of such a salve can speak, " +
        "That heals the wound, and cures not the disgrace: " +
        "Nor can thy shame give physic to my grief; " +
        "Though thou repent, yet I have still the loss: " +
        "The offender's sorrow lends but weak relief " +
        "To him that bears the strong offence's cross. " +
        "  Ah! but those tears are pearl which thy love sheds, " +
        "  And they are rich and ransom all ill deeds. " +
        "No more be griev'd at that which thou hast done: " +
        "Roses have thorns, and silver fountains mud: " +
        "Clouds and eclipses stain both moon and sun, " +
        "And loathsome canker lives in sweetest bud. " +
        "All men make faults, and even I in this, " +
        "Authorizing thy trespass with compare, " +
        "Myself corrupting, salving thy amiss, " +
        "Excusing thy sins more than thy sins are; " +
        "For to thy sensual fault I bring in sense,-- " +
        "Thy adverse party is thy advocate,-- " +
        "And gainst myself a lawful plea commence: " +
        "Such civil war is in my love and hate, " +
        "  That I an accessary needs must be, " +
        "  To that sweet thief which sourly robs from me. " +
        "Let me confess that we two must be twain, " +
        "Although our undivided loves are one: " +
        "So shall those blots that do with me remain, " +
        "Without thy help, by me be borne alone. " +
        "In our two loves there is but one respect, " +
        "Though in our lives a separable spite, " +
        "Which though it alter not love's sole effect, " +
        "Yet doth it steal sweet hours from love's delight. " +
        "I may not evermore acknowledge thee, " +
        "Lest my bewailed guilt should do thee shame, " +
        "Nor thou with public kindness honour me, " +
        "Unless thou take that honour from thy name: " +
        "  But do not so, I love thee in such sort, " +
        "  As thou being mine, mine is thy good report. " +
        "As a decrepit father takes delight " +
        "To see his active child do deeds of youth, " +
        "So I, made lame by Fortune's dearest spite, " +
        "Take all my comfort of thy worth and truth; " +
        "For whether beauty, birth, or wealth, or wit, " +
        "Or any of these all, or all, or more, " +
        "Entitled in thy parts, do crowned sit, " +
        "I make my love engrafted, to this store: " +
        "So then I am not lame, poor, nor despis'd, " +
        "Whilst that this shadow doth such substance give " +
        "That I in thy abundance am suffic'd, " +
        "And by a part of all thy glory live. " +
        "  Look what is best, that best I wish in thee: " +
        "  This wish I have; then ten times happy me! " +
        "How can my muse want subject to invent, " +
        "While thou dost breathe, that pour'st into my verse " +
        "Thine own sweet argument, too excellent " +
        "For every vulgar paper to rehearse? " +
        "O! give thy self the thanks, if aught in me " +
        "Worthy perusal stand against thy sight; " +
        "For who's so dumb that cannot write to thee, " +
        "When thou thy self dost give invention light? " +
        "Be thou the tenth Muse, ten times more in worth " +
        "Than those old nine which rhymers invocate; " +
        "And he that calls on thee, let him bring forth " +
        "Eternal numbers to outlive long date. " +
        "  If my slight muse do please these curious days, " +
        "  The pain be mine, but thine shall be the praise. " +
        "O! how thy worth with manners may I sing, " +
        "When thou art all the better part of me? " +
        "What can mine own praise to mine own self bring? " +
        "And what is't but mine own when I praise thee? " +
        "Even for this, let us divided live, " +
        "And our dear love lose name of single one, " +
        "That by this separation I may give " +
        "That due to thee which thou deserv'st alone. " +
        "O absence! what a torment wouldst thou prove, " +
        "Were it not thy sour leisure gave sweet leave, " +
        "To entertain the time with thoughts of love, " +
        "Which time and thoughts so sweetly doth deceive, " +
        "  And that thou teachest how to make one twain, " +
        "  By praising him here who doth hence remain. " +
        "Take all my loves, my love, yea take them all; " +
        "What hast thou then more than thou hadst before? " +
        "No love, my love, that thou mayst true love call; " +
        "All mine was thine, before thou hadst this more. " +
        "Then, if for my love, thou my love receivest, " +
        "I cannot blame thee, for my love thou usest; " +
        "But yet be blam'd, if thou thy self deceivest " +
        "By wilful taste of what thyself refusest. " +
        "I do forgive thy robbery, gentle thief, " +
        "Although thou steal thee all my poverty: " +
        "And yet, love knows it is a greater grief " +
        "To bear love's wrong, than hate's known injury. " +
        "  Lascivious grace, in whom all ill well shows, " +
        "  Kill me with spites yet we must not be foes. " +
        "Those pretty wrongs that liberty commits, " +
        "When I am sometime absent from thy heart, " +
        "Thy beauty, and thy years full well befits, " +
        "For still temptation follows where thou art. " +
        "Gentle thou art, and therefore to be won, " +
        "Beauteous thou art, therefore to be assail'd; " +
        "And when a woman woos, what woman's son " +
        "Will sourly leave her till he have prevail'd? " +
        "Ay me! but yet thou mightst my seat forbear, " +
        "And chide thy beauty and thy straying youth, " +
        "Who lead thee in their riot even there " +
        "Where thou art forced to break a twofold truth:-- " +
        "  Hers by thy beauty tempting her to thee, " +
        "  Thine by thy beauty being false to me. " +
        "That thou hast her it is not all my grief, " +
        "And yet it may be said I loved her dearly; " +
        "That she hath thee is of my wailing chief, " +
        "A loss in love that touches me more nearly. " +
        "Loving offenders thus I will excuse ye: " +
        "Thou dost love her, because thou know'st I love her; " +
        "And for my sake even so doth she abuse me, " +
        "Suffering my friend for my sake to approve her. " +
        "If I lose thee, my loss is my love's gain, " +
        "And losing her, my friend hath found that loss; " +
        "Both find each other, and I lose both twain, " +
        "And both for my sake lay on me this cross: " +
        "  But here's the joy; my friend and I are one; " +
        "  Sweet flattery! then she loves but me alone. " +
        "When most I wink, then do mine eyes best see, " +
        "For all the day they view things unrespected; " +
        "But when I sleep, in dreams they look on thee, " +
        "And darkly bright, are bright in dark directed. " +
        "Then thou, whose shadow shadows doth make bright, " +
        "How would thy shadow's form form happy show " +
        "To the clear day with thy much clearer light, " +
        "When to unseeing eyes thy shade shines so! " +
        "How would, I say, mine eyes be blessed made " +
        "By looking on thee in the living day, " +
        "When in dead night thy fair imperfect shade " +
        "Through heavy sleep on sightless eyes doth stay! " +
        "  All days are nights to see till I see thee, " +
        "  And nights bright days when dreams do show thee me. " +
        "If the dull substance of my flesh were thought, " +
        "Injurious distance should not stop my way; " +
        "For then despite of space I would be brought, " +
        "From limits far remote, where thou dost stay. " +
        "No matter then although my foot did stand " +
        "Upon the farthest earth remov'd from thee; " +
        "For nimble thought can jump both sea and land, " +
        "As soon as think the place where he would be. " +
        "But, ah! thought kills me that I am not thought, " +
        "To leap large lengths of miles when thou art gone, " +
        "But that so much of earth and water wrought, " +
        "I must attend, time's leisure with my moan; " +
        "  Receiving nought by elements so slow " +
        "  But heavy tears, badges of either's woe. " +
        "The other two, slight air, and purging fire " +
        "Are both with thee, wherever I abide; " +
        "The first my thought, the other my desire, " +
        "These present-absent with swift motion slide. " +
        "For when these quicker elements are gone " +
        "In tender embassy of love to thee, " +
        "My life, being made of four, with two alone " +
        "Sinks down to death, oppress'd with melancholy; " +
        "Until life's composition be recur'd " +
        "By those swift messengers return'd from thee, " +
        "Who even but now come back again, assur'd, " +
        "Of thy fair health, recounting it to me: " +
        "  This told, I joy; but then no longer glad, " +
        "  I send them back again, and straight grow sad. " +
        "Mine eye and heart are at a mortal war, " +
        "How to divide the conquest of thy sight; " +
        "Mine eye my heart thy picture's sight would bar, " +
        "My heart mine eye the freedom of that right. " +
        "My heart doth plead that thou in him dost lie,-- " +
        "A closet never pierc'd with crystal eyes-- " +
        "But the defendant doth that plea deny, " +
        "And says in him thy fair appearance lies. " +
        "To side this title is impannelled " +
        "A quest of thoughts, all tenants to the heart; " +
        "And by their verdict is determined " +
        "The clear eye's moiety, and the dear heart's part: " +
        "  As thus; mine eye's due is thy outward part, " +
        "  And my heart's right, thy inward love of heart. " +
        "Betwixt mine eye and heart a league is took, " +
        "And each doth good turns now unto the other: " +
        "When that mine eye is famish'd for a look, " +
        "Or heart in love with sighs himself doth smother, " +
        "With my love's picture then my eye doth feast, " +
        "And to the painted banquet bids my heart; " +
        "Another time mine eye is my heart's guest, " +
        "And in his thoughts of love doth share a part: " +
        "So, either by thy picture or my love, " +
        "Thy self away, art present still with me; " +
        "For thou not farther than my thoughts canst move, " +
        "And I am still with them, and they with thee; " +
        "  Or, if they sleep, thy picture in my sight " +
        "  Awakes my heart, to heart's and eye's delight. " +
        "How careful was I when I took my way, " +
        "Each trifle under truest bars to thrust, " +
        "That to my use it might unused stay " +
        "From hands of falsehood, in sure wards of trust! " +
        "But thou, to whom my jewels trifles are, " +
        "Most worthy comfort, now my greatest grief, " +
        "Thou best of dearest, and mine only care, " +
        "Art left the prey of every vulgar thief. " +
        "Thee have I not lock'd up in any chest, " +
        "Save where thou art not, though I feel thou art, " +
        "Within the gentle closure of my breast, " +
        "From whence at pleasure thou mayst come and part; " +
        "  And even thence thou wilt be stol'n I fear, " +
        "  For truth proves thievish for a prize so dear. " +
        "Against that time, if ever that time come, " +
        "When I shall see thee frown on my defects, " +
        "When as thy love hath cast his utmost sum, " +
        "Call'd to that audit by advis'd respects; " +
        "Against that time when thou shalt strangely pass, " +
        "And scarcely greet me with that sun, thine eye, " +
        "When love, converted from the thing it was, " +
        "Shall reasons find of settled gravity; " +
        "Against that time do I ensconce me here, " +
        "Within the knowledge of mine own desert, " +
        "And this my hand, against my self uprear, " +
        "To guard the lawful reasons on thy part: " +
        "  To leave poor me thou hast the strength of laws, " +
        "  Since why to love I can allege no cause. " +
        "How heavy do I journey on the way, " +
        "When what I seek, my weary travel's end, " +
        "Doth teach that ease and that repose to say, " +
        "Thus far the miles are measured from thy friend! " +
        "The beast that bears me, tired with my woe, " +
        "Plods dully on, to bear that weight in me, " +
        "As if by some instinct the wretch did know " +
        "His rider lov'd not speed, being made from thee: " +
        "The bloody spur cannot provoke him on, " +
        "That sometimes anger thrusts into his hide, " +
        "Which heavily he answers with a groan, " +
        "More sharp to me than spurring to his side; " +
        "  For that same groan doth put this in my mind, " +
        "  My grief lies onward, and my joy behind. " +
        "Thus can my love excuse the slow offence " +
        "Of my dull bearer when from thee I speed: " +
        "From where thou art why should I haste me thence? " +
        "Till I return, of posting is no need. " +
        "O! what excuse will my poor beast then find, " +
        "When swift extremity can seem but slow? " +
        "Then should I spur, though mounted on the wind, " +
        "In winged speed n:motion shall I know, " +
        "Then can no horse with my desire keep pace; " +
        "Therefore desire, of perfect'st love being made, " +
        "Shall neigh--no dull flesh--in his fiery race; " +
        "But love, for love, thus shall excuse my jade,-- " +
        "  Since from thee going, he went wilful-slow, " +
        "  Towards thee I'll run, and give him leave to go. " +
        "So am I as the rich, whose blessed key, " +
        "Can bring him to his sweet up-locked treasure, " +
        "The which he will not every hour survey, " +
        "For blunting the fine point of seldom pleasure. " +
        "Therefore are feasts so solemn and so rare, " +
        "Since, seldom coming in that long year set, " +
        "Like stones of worth they thinly placed are, " +
        "Or captain jewels in the carcanet. " +
        "So is the time that keeps you as my chest, " +
        "Or as the wardrobe which the robe doth hide, " +
        "To make some special instant special-blest, " +
        "By new unfolding his imprison'd pride. " +
        "  Blessed are you whose worthiness gives scope, " +
        "  Being had, to triumph; being lacked, to hope. " +
        "What is your substance, whereof are you made, " +
        "That millions of strange shadows on you tend? " +
        "Since every one, hath every one, one shade, " +
        "And you but one, can every shadow lend. " +
        "Describe Adonis, and the counterfeit " +
        "Is poorly imitated after you; " +
        "On Helen's cheek all art of beauty set, " +
        "And you in Grecian tires are painted new: " +
        "Speak of the spring, and foison of the year, " +
        "The one doth shadow of your beauty show, " +
        "The other as your bounty doth appear; " +
        "And you in every blessed shape we know. " +
        "  In all external grace you have some part, " +
        "  But you like none, none you, for constant heart. " +
        "O! how much more doth beauty beauteous seem " +
        "By that sweet ornament which truth doth give. " +
        "The rose looks fair, but fairer we it deem " +
        "For that sweet odour, which doth in it live. " +
        "The canker blooms have full as deep a dye " +
        "As the perfumed tincture of the roses. " +
        "Hang on such thorns, and play as wantonly " +
        "When summer's breath their masked buds discloses: " +
        "But, for their virtue only is their show, " +
        "They live unwoo'd, and unrespected fade; " +
        "Die to themselves. Sweet roses do not so; " +
        "Of their sweet deaths, are sweetest odours made: " +
        "  And so of you, beauteous and lovely youth, " +
        "  When that shall vade, by verse distills your truth. " +
        "Not marble, nor the gilded monuments " +
        "Of princes, shall outlive this powerful rhyme; " +
        "But you shall shine more bright in these contents " +
        "Than unswept stone, besmear'd with sluttish time. " +
        "When wasteful war shall statues overturn, " +
        "And broils root out the work of masonry, " +
        "Nor Mars his sword, nor war's quick fire shall burn " +
        "The living record of your memory. " +
        "Gainst death, and all-oblivious enmity " +
        "Shall you pace forth; your praise shall still find room " +
        "Even in the eyes of all posterity " +
        "That wear this world out to the ending doom. " +
        "  So, till the judgment that yourself arise, " +
        "  You live in this, and dwell in lovers eyes. " +
        "Sweet love, renew thy force; be it not said " +
        "Thy edge should blunter be than appetite, " +
        "Which but to-day by feeding is allay'd, " +
        "To-morrow sharpened in his former might: " +
        "So, love, be thou, although to-day thou fill " +
        "Thy hungry eyes, even till they wink with fulness, " +
        "To-morrow see again, and do not kill " +
        "The spirit of love, with a perpetual dulness. " +
        "Let this sad interim like the ocean be " +
        "Which parts the shore, where two contracted new " +
        "Come daily to the banks, that when they see " +
        "Return of love, more blest may be the view; " +
        "  Or call it winter, which being full of care, " +
        "  Makes summer's welcome, thrice more wished, more rare. " +
        "Being your slave what should I do but tend, " +
        "Upon the hours, and times of your desire? " +
        "I have no precious time at all to spend; " +
        "Nor services to do, till you require. " +
        "Nor dare I chide the world-without-end hour, " +
        "Whilst I, my sovereign, watch the clock for you, " +
        "Nor think the bitterness of absence sour, " +
        "When you have bid your servant once adieu; " +
        "Nor dare I question with my jealous thought " +
        "Where you may be, or your affairs suppose, " +
        "But, like a sad slave, stay and think of nought " +
        "Save, where you are, how happy you make those. " +
        "  So true a fool is love, that in your will, " +
        "  Though you do anything, he thinks no ill. " +
        "That god forbid, that made me first your slave, " +
        "I should in thought control your times of pleasure, " +
        "Or at your hand the account of hours to crave, " +
        "Being your vassal, bound to stay your leisure! " +
        "O! let me suffer, being at your beck, " +
        "The imprison'd absence of your liberty; " +
        "And patience, tame to sufferance, bide each check, " +
        "Without accusing you of injury. " +
        "Be where you list, your charter is so strong " +
        "That you yourself may privilage your time " +
        "To what you will; to you it doth belong " +
        "Yourself to pardon of self-doing crime. " +
        "  I am to wait, though waiting so be hell, " +
        "  Not blame your pleasure be it ill or well. " +
        "If there be nothing new, but that which is " +
        "Hath been before, how are our brains beguil'd, " +
        "Which labouring for invention bear amiss " +
        "The second burthen of a former child! " +
        "O! that record could with a backward look, " +
        "Even of five hundred courses of the sun, " +
        "Show me your image in some antique book, " +
        "Since mind at first in character was done! " +
        "That I might see what the old world could say " +
        "To this composed wonder of your frame; " +
        "Wh'r we are mended, or wh'r better they, " +
        "Or whether revolution be the same. " +
        "  O! sure I am the wits of former days, " +
        "  To subjects worse have given admiring praise. " +
        "Like as the waves make towards the pebbled shore, " +
        "So do our minutes hasten to their end; " +
        "Each changing place with that which goes before, " +
        "In sequent toil all forwards do contend. " +
        "Nativity, once in the main of light, " +
        "Crawls to maturity, wherewith being crown'd, " +
        "Crooked eclipses gainst his glory fight, " +
        "And Time that gave doth now his gift confound. " +
        "Time doth transfix the flourish set on youth " +
        "And delves the parallels in beauty's brow, " +
        "Feeds on the rarities of nature's truth, " +
        "And nothing stands but for his scythe to mow: " +
        "  And yet to times in hope, my verse shall stand. " +
        "  Praising thy worth, despite his cruel hand. " +
        "Is it thy will, thy image should keep open " +
        "My heavy eyelids to the weary night? " +
        "Dost thou desire my slumbers should be broken, " +
        "While shadows like to thee do mock my sight? " +
        "Is it thy spirit that thou send'st from thee " +
        "So far from home into my deeds to pry, " +
        "To find out shames and idle hours in me, " +
        "The scope and tenure of thy jealousy? " +
        "O, no! thy love, though much, is not so great: " +
        "It is my love that keeps mine eye awake: " +
        "Mine own true love that doth my rest defeat, " +
        "To play the watchman ever for thy sake: " +
        "  For thee watch I, whilst thou dost wake elsewhere, " +
        "  From me far off, with others all too near. " +
        "Sin of self-love possesseth all mine eye " +
        "And all my soul, and all my every part; " +
        "And for this sin there is no remedy, " +
        "It is so grounded inward in my heart. " +
        "Methinks no face so gracious is as mine, " +
        "No shape so true, no truth of such account; " +
        "And for myself mine own worth do define, " +
        "As I all other in all worths surmount. " +
        "But when my glass shows me myself indeed " +
        "Beated and chopp'd with tanned antiquity, " +
        "Mine own self-love quite contrary I read; " +
        "Self so self-loving were iniquity. " +
        "  Tis thee,--myself,--that for myself I praise, " +
        "  Painting my age with beauty of thy days. " +
        "Against my love shall be as I am now, " +
        "With Time's injurious hand crush'd and o'erworn; " +
        "When hours have drain'd his blood and fill'd his brow " +
        "With lines and wrinkles; when his youthful morn " +
        "Hath travell'd on to age's steepy night; " +
        "And all those beauties whereof now he's king " +
        "Are vanishing, or vanished out of sight, " +
        "Stealing away the treasure of his spring; " +
        "For such a time do I now fortify " +
        "Against confounding age's cruel knife, " +
        "That he shall never cut from memory " +
        "My sweet love's beauty, though my lover's life: " +
        "  His beauty shall in these black lines be seen, " +
        "  And they shall live, and he in them still green. " +
        "When I have seen by Time's fell hand defac'd " +
        "The rich-proud cost of outworn buried age; " +
        "When sometime lofty towers I see down-raz'd, " +
        "And brass eternal slave to mortal rage; " +
        "When I have seen the hungry ocean gain " +
        "Advantage on the kingdom of the shore, " +
        "And the firm soil win of the watery main, " +
        "Increasing store with loss, and loss with store; " +
        "When I have seen such interchange of state, " +
        "Or state itself confounded, to decay; " +
        "Ruin hath taught me thus to ruminate-- " +
        "That Time will come and take my love away. " +
        "  This thought is as a death which cannot choose " +
        "  But weep to have, that which it fears to lose. " +
        "Since brass, nor stone, nor earth, nor boundless sea, " +
        "But sad mortality o'ersways their power, " +
        "How with this rage shall beauty hold a plea, " +
        "Whose action is no stronger than a flower? " +
        "O! how shall summer's honey breath hold out, " +
        "Against the wrackful siege of battering days, " +
        "When rocks impregnable are not so stout, " +
        "Nor gates of steel so strong but Time decays? " +
        "O fearful meditation! where, alack, " +
        "Shall Time's best jewel from Time's chest lie hid? " +
        "Or what strong hand can hold his swift foot back? " +
        "Or who his spoil of beauty can forbid? " +
        "  O! none, unless this miracle have might, " +
        "  That in black ink my love may still shine bright. " +
        "Tired with all these, for restful death I cry, " +
        "As to behold desert a beggar born, " +
        "And needy nothing trimm'd in jollity, " +
        "And purest faith unhappily forsworn, " +
        "And gilded honour shamefully misplac'd, " +
        "And maiden virtue rudely strumpeted, " +
        "And right perfection wrongfully disgrac'd, " +
        "And strength by limping sway disabled " +
        "And art made tongue-tied by authority, " +
        "And folly--doctor-like--controlling skill, " +
        "And simple truth miscall'd simplicity, " +
        "And captive good attending captain ill: " +
        "  Tir'd with all these, from these would I be gone, " +
        "  Save that, to die, I leave my love alone. " +
        "Ah! wherefore with infection should he live, " +
        "And with his presence grace impiety, " +
        "That sin by him advantage should achieve, " +
        "And lace itself with his society? " +
        "Why should false painting imitate his cheek, " +
        "And steel dead seeming of his living hue? " +
        "Why should poor beauty indirectly seek " +
        "Roses of shadow, since his rose is true? " +
        "Why should he live, now Nature bankrupt is, " +
        "Beggar'd of blood to blush through lively veins? " +
        "For she hath no exchequer now but his, " +
        "And proud of many, lives upon his gains. " +
        "  O! him she stores, to show what wealth she had " +
        "  In days long since, before these last so bad. " +
        "Thus is his cheek the map of days outworn, " +
        "When beauty lived and died as flowers do now, " +
        "Before these bastard signs of fair were born, " +
        "Or durst inhabit on a living brow; " +
        "Before the golden tresses of the dead, " +
        "The right of sepulchres, were shorn away, " +
        "To live a second life on second head; " +
        "Ere beauty's dead fleece made another gay: " +
        "In him those holy antique hours are seen, " +
        "Without all ornament, itself and true, " +
        "Making no summer of another's green, " +
        "Robbing no old to dress his beauty new; " +
        "  And him as for a map doth Nature store, " +
        "  To show false Art what beauty was of yore. " +
        "Those parts of thee that the world's eye doth view " +
        "Want nothing that the thought of hearts can mend; " +
        "All tongues--the voice of souls--give thee that due, " +
        "Uttering bare truth, even so as foes commend. " +
        "Thy outward thus with outward praise is crown'd; " +
        "But those same tongues, that give thee so thine own, " +
        "In other accents do this praise confound " +
        "By seeing farther than the eye hath shown. " +
        "They look into the beauty of thy mind, " +
        "And that in guess they measure by thy deeds; " +
        "Then--churls--their thoughts, although their eyes were kind, " +
        "To thy fair flower add the rank smell of weeds: " +
        "  But why thy odour matcheth not thy show, " +
        "  The soil is this, that thou dost common grow. " +
        "That thou art blam'd shall not be thy defect, " +
        "For slander's mark was ever yet the fair; " +
        "The ornament of beauty is suspect, " +
        "A crow that flies in heaven's sweetest air. " +
        "So thou be good, slander doth but approve " +
        "Thy worth the greater being woo'd of time; " +
        "For canker vice the sweetest buds doth love, " +
        "And thou present'st a pure unstained prime. " +
        "Thou hast passed by the ambush of young days " +
        "Either not assail'd, or victor being charg'd; " +
        "Yet this thy praise cannot be so thy praise, " +
        "To tie up envy, evermore enlarg'd, " +
        "  If some suspect of ill mask'd not thy show, " +
        "  Then thou alone kingdoms of hearts shouldst owe. " +
        "No longer mourn for me when I am dead " +
        "Than you shall hear the surly sullen bell " +
        "Give warning to the world that I am fled " +
        "From this vile world with vilest worms to dwell: " +
        "Nay, if you read this line, remember not " +
        "The hand that writ it, for I love you so, " +
        "That I in your sweet thoughts would be forgot, " +
        "If thinking on me then should make you woe. " +
        "O! if,--I say you look upon this verse, " +
        "When I perhaps compounded am with clay, " +
        "Do not so much as my poor name rehearse; " +
        "But let your love even with my life decay; " +
        "  Lest the wise world should look into your moan, " +
        "  And mock you with me after I am gone. " +
        "O! lest the world should task you to recite " +
        "What merit lived in me, that you should love " +
        "After my death,--dear love, forget me quite, " +
        "For you in me can nothing worthy prove; " +
        "Unless you would devise some virtuous lie, " +
        "To do more for me than mine own desert, " +
        "And hang more praise upon deceased I " +
        "Than niggard truth would willingly impart: " +
        "O! lest your true love may seem false in this " +
        "That you for love speak well of me untrue, " +
        "My name be buried where my body is, " +
        "And live no more to shame nor me nor you. " +
        "  For I am shamed by that which I bring forth, " +
        "  And so should you, to love things nothing worth. " +
        "That time of year thou mayst in me behold " +
        "When yellow leaves, or none, or few, do hang " +
        "Upon those boughs which shake against the cold, " +
        "Bare ruin'd choirs, where late the sweet birds sang. " +
        "In me thou see'st the twilight of such day " +
        "As after sunset fadeth in the west; " +
        "Which by and by black night doth take away, " +
        "Death's second self, that seals up all in rest. " +
        "In me thou see'st the glowing of such fire, " +
        "That on the ashes of his youth doth lie, " +
        "As the death-bed, whereon it must expire, " +
        "Consum'd with that which it was nourish'd by. " +
        "  This thou perceiv'st, which makes thy love more strong, " +
        "  To love that well, which thou must leave ere long. " +
        "But be contented: when that fell arrest " +
        "Without all bail shall carry me away, " +
        "My life hath in this line some interest, " +
        "Which for memorial still with thee shall stay. " +
        "When thou reviewest this, thou dost review " +
        "The very part was consecrate to thee: " +
        "The earth can have but earth, which is his due; " +
        "My spirit is thine, the better part of me: " +
        "So then thou hast but lost the dregs of life, " +
        "The prey of worms, my body being dead; " +
        "The coward conquest of a wretch's knife, " +
        "Too base of thee to be remembered,. " +
        "  The worth of that is that which it contains, " +
        "  And that is this, and this with thee remains. " +
        "So are you to my thoughts as food to life, " +
        "Or as sweet-season'd showers are to the ground; " +
        "And for the peace of you I hold such strife " +
        "As twixt a miser and his wealth is found. " +
        "Now proud as an enjoyer, and anon " +
        "Doubting the filching age will steal his treasure; " +
        "Now counting best to be with you alone, " +
        "Then better'd that the world may see my pleasure: " +
        "Sometime all full with feasting on your sight, " +
        "And by and by clean starved for a look; " +
        "Possessing or pursuing no delight, " +
        "Save what is had, or must from you be took. " +
        "  Thus do I pine and surfeit day by day, " +
        "  Or gluttoning on all, or all away. " +
        "Why is my verse so barren of new pride, " +
        "So far from variation or quick change? " +
        "Why with the time do I not glance aside " +
        "To new-found methods, and to compounds strange? " +
        "Why write I still all one, ever the same, " +
        "And keep invention in a noted weed, " +
        "That every word doth almost tell my name, " +
        "Showing their birth, and where they did proceed? " +
        "O! know sweet love I always write of you, " +
        "And you and love are still my argument; " +
        "So all my best is dressing old words new, " +
        "Spending again what is already spent: " +
        "  For as the sun is daily new and old, " +
        "  So is my love still telling what is told. " +
        "Thy glass will show thee how thy beauties wear, " +
        "Thy dial how thy precious minutes waste; " +
        "These vacant leaves thy mind's imprint will bear, " +
        "And of this book, this learning mayst thou taste. " +
        "The wrinkles which thy glass will truly show " +
        "Of mouthed graves will give thee memory; " +
        "Thou by thy dial's shady stealth mayst know " +
        "Time's thievish progress to eternity. " +
        "Look! what thy memory cannot contain, " +
        "Commit to these waste blanks, and thou shalt find " +
        "Those children nursed, deliver'd from thy brain, " +
        "To take a new acquaintance of thy mind. " +
        "  These offices, so oft as thou wilt look, " +
        "  Shall profit thee and much enrich thy book. " +
        "So oft have I invoked thee for my Muse, " +
        "And found such fair assistance in my verse " +
        "As every alien pen hath got my use " +
        "And under thee their poesy disperse. " +
        "Thine eyes, that taught the dumb on high to sing " +
        "And heavy ignorance aloft to fly, " +
        "Have added feathers to the learned's wing " +
        "And given grace a double majesty. " +
        "Yet be most proud of that which I compile, " +
        "Whose influence is thine, and born of thee: " +
        "In others works thou dost but mend the style, " +
        "And arts with thy sweet graces graced be; " +
        "  But thou art all my art, and dost advance " +
        "  As high as learning, my rude ignorance. " +
        "Whilst I alone did call upon thy aid, " +
        "My verse alone had all thy gentle grace; " +
        "But now my gracious numbers are decay'd, " +
        "And my sick Muse doth give an other place. " +
        "I grant, sweet love, thy lovely argument " +
        "Deserves the travail of a worthier pen; " +
        "Yet what of thee thy poet doth invent " +
        "He robs thee of, and pays it thee again. " +
        "He lends thee virtue, and he stole that word " +
        "From thy behaviour; beauty doth he give, " +
        "And found it in thy cheek: he can afford " +
        "No praise to thee, but what in thee doth live. " +
        "  Then thank him not for that which he doth say, " +
        "  Since what he owes thee, thou thyself dost pay. " +
        "O! how I faint when I of you do write, " +
        "Knowing a better spirit doth use your name, " +
        "And in the praise thereof spends all his might, " +
        "To make me tongue-tied speaking of your fame! " +
        "But since your worth--wide as the ocean is,-- " +
        "The humble as the proudest sail doth bear, " +
        "My saucy bark, inferior far to his, " +
        "On your broad main doth wilfully appear. " +
        "Your shallowest help will hold me up afloat, " +
        "Whilst he upon your soundless deep doth ride; " +
        "Or, being wrack'd, I am a worthless boat, " +
        "He of tall building, and of goodly pride: " +
        "  Then if he thrive and I be cast away, " +
        "  The worst was this,--my love was my decay. " +
        "Or I shall live your epitaph to make, " +
        "Or you survive when I in earth am rotten; " +
        "From hence your memory death cannot take, " +
        "Although in me each part will be forgotten. " +
        "Your name from hence immortal life shall have, " +
        "Though I, once gone, to all the world must die: " +
        "The earth can yield me but a common grave, " +
        "When you entombed in men's eyes shall lie. " +
        "Your monument shall be my gentle verse, " +
        "Which eyes not yet created shall o'er-read; " +
        "And tongues to be, your being shall rehearse, " +
        "When all the breathers of this world are dead; " +
        "  You still shall live,--such virtue hath my pen,-- " +
        "  Where breath most breathes, even in the mouths of men. " +
        "I grant thou wert not married to my Muse, " +
        "And therefore mayst without attaint o'erlook " +
        "The dedicated words which writers use " +
        "Of their fair subject, blessing every book. " +
        "Thou art as fair in knowledge as in hue, " +
        "Finding thy worth a limit past my praise; " +
        "And therefore art enforced to seek anew " +
        "Some fresher stamp of the time-bettering days. " +
        "And do so, love; yet when they have devis'd, " +
        "What strained touches rhetoric can lend, " +
        "Thou truly fair, wert truly sympathiz'd " +
        "In true plain words, by thy true-telling friend; " +
        "  And their gross painting might be better us'd " +
        "  Where cheeks need blood; in thee it is abus'd. " +
        "I never saw that you did painting need, " +
        "And therefore to your fair no painting set; " +
        "I found, or thought I found, you did exceed " +
        "That barren tender of a poet's debt: " +
        "And therefore have I slept in your report, " +
        "That you yourself, being extant, well might show " +
        "How far a modern quill doth come too short, " +
        "Speaking of worth, what worth in you doth grow. " +
        "This silence for my sin you did impute, " +
        "Which shall be most my glory being dumb; " +
        "For I impair not beauty being mute, " +
        "When others would give life, and bring a tomb. " +
        "  There lives more life in one of your fair eyes " +
        "  Than both your poets can in praise devise. " +
        "Who is it that says most, which can say more, " +
        "Than this rich praise,--that you alone, are you? " +
        "In whose confine immured is the store " +
        "Which should example where your equal grew. " +
        "Lean penury within that pen doth dwell " +
        "That to his subject lends not some small glory; " +
        "But he that writes of you, if he can tell " +
        "That you are you, so dignifies his story, " +
        "Let him but copy what in you is writ, " +
        "Not making worse what nature made so clear, " +
        "And such a counterpart shall fame his wit, " +
        "Making his style admired every where. " +
        "  You to your beauteous blessings add a curse, " +
        "  Being fond on praise, which makes your praises worse. " +
        "My tongue-tied Muse in manners holds her still, " +
        "While comments of your praise richly compil'd, " +
        "Reserve their character with golden quill, " +
        "And precious phrase by all the Muses fil'd. " +
        "I think good thoughts, whilst others write good words, " +
        "And like unlettered clerk still cry Amen " +
        "To every hymn that able spirit affords, " +
        "In polish'd form of well-refined pen. " +
        "Hearing you praised, I say 'tis so, tis true, " +
        "And to the most of praise add something more; " +
        "But that is in my thought, whose love to you, " +
        "Though words come hindmost, holds his rank before. " +
        "  Then others, for the breath of words respect, " +
        "  Me for my dumb thoughts, speaking in effect. " +
        "Was it the proud full sail of his great verse, " +
        "Bound for the prize of all too precious you, " +
        "That did my ripe thoughts in my brain inhearse, " +
        "Making their tomb the womb wherein they grew? " +
        "Was it his spirit, by spirits taught to write, " +
        "Above a mortal pitch, that struck me dead? " +
        "No, neither he, nor his compeers by night " +
        "Giving him aid, my verse astonished. " +
        "He, nor that affable familiar ghost " +
        "Which nightly gulls him with intelligence, " +
        "As victors of my silence cannot boast; " +
        "I was not sick of any fear from thence: " +
        "  But when your countenance fill'd up his line, " +
        "  Then lacked I matter; that enfeebled mine. " +
        "Farewell! thou art too dear for my possessing, " +
        "And like enough thou know'st thy estimate, " +
        "The charter of thy worth gives thee releasing; " +
        "My bonds in thee are all determinate. " +
        "For how do I hold thee but by thy granting? " +
        "And for that riches where is my deserving? " +
        "The cause of this fair gift in me is wanting, " +
        "And so my patent back again is swerving. " +
        "Thy self thou gav'st, thy own worth then not knowing, " +
        "Or me to whom thou gav'st it, else mistaking; " +
        "So thy great gift, upon misprision growing, " +
        "Comes home again, on better judgement making. " +
        "  Thus have I had thee, as a dream doth flatter, " +
        "  In sleep a king, but waking no such matter. " +
        "When thou shalt be dispos'd to set me light, " +
        "And place my merit in the eye of scorn, " +
        "Upon thy side, against myself I'll fight, " +
        "And prove thee virtuous, though thou art forsworn. " +
        "With mine own weakness, being best acquainted, " +
        "Upon thy part I can set down a story " +
        "Of faults conceal'd, wherein I am attainted; " +
        "That thou in losing me shalt win much glory: " +
        "And I by this will be a gainer too; " +
        "For bending all my loving thoughts on thee, " +
        "The injuries that to myself I do, " +
        "Doing thee vantage, double-vantage me. " +
        "  Such is my love, to thee I so belong, " +
        "  That for thy right, myself will bear all wrong. " +
        "Say that thou didst forsake me for some fault, " +
        "And I will comment upon that offence: " +
        "Speak of my lameness, and I straight will halt, " +
        "Against thy reasons making no defence. " +
        "Thou canst not love disgrace me half so ill, " +
        "To set a form upon desired change, " +
        "As I'll myself disgrace; knowing thy will, " +
        "I will acquaintance strangle, and look strange; " +
        "Be absent from thy walks; and in my tongue " +
        "Thy sweet beloved name no more shall dwell, " +
        "Lest I, too much profane, should do it wrong, " +
        "And haply of our old acquaintance tell. " +
        "  For thee, against my self I'll vow debate, " +
        "  For I must ne'er love him whom thou dost hate. " +
        "Then hate me when thou wilt; if ever, now; " +
        "Now, while the world is bent my deeds to cross, " +
        "Join with the spite of fortune, make me bow, " +
        "And do not drop in for an after-loss: " +
        "Ah! do not, when my heart hath scap'd this sorrow, " +
        "Come in the rearward of a conquer'd woe; " +
        "Give not a windy night a rainy morrow, " +
        "To linger out a purpos'd overthrow. " +
        "If thou wilt leave me, do not leave me last, " +
        "When other petty griefs have done their spite, " +
        "But in the onset come: so shall I taste " +
        "At first the very worst of fortune's might; " +
        "  And other strains of woe, which now seem woe, " +
        "  Compar'd with loss of thee, will not seem so. " +
        "Some glory in their birth, some in their skill, " +
        "Some in their wealth, some in their body's force, " +
        "Some in their garments though new-fangled ill; " +
        "Some in their hawks and hounds, some in their horse; " +
        "And every humour hath his adjunct pleasure, " +
        "Wherein it finds a joy above the rest: " +
        "But these particulars are not my measure, " +
        "All these I better in one general best. " +
        "Thy love is better than high birth to me, " +
        "Richer than wealth, prouder than garments costs, " +
        "Of more delight than hawks and horses be; " +
        "And having thee, of all men's pride I boast: " +
        "  Wretched in this alone, that thou mayst take " +
        "  All this away, and me most wretchcd make. " +
        "But do thy worst to steal thyself away, " +
        "For term of life thou art assured mine; " +
        "And life no longer than thy love will stay, " +
        "For it depends upon that love of thine. " +
        "Then need I not to fear the worst of wrongs, " +
        "When in the least of them my life hath end. " +
        "I see a better state to me belongs " +
        "Than that which on thy humour doth depend: " +
        "Thou canst not vex me with inconstant mind, " +
        "Since that my life on thy revolt doth lie. " +
        "O! what a happy title do I find, " +
        "Happy to have thy love, happy to die! " +
        "  But what's so blessed-fair that fears no blot? " +
        "  Thou mayst be false, and yet I know it not. " +
        "So shall I live, supposing thou art true, " +
        "Like a deceived husband; so love's face " +
        "May still seem love to me, though alter'd new; " +
        "Thy looks with me, thy heart in other place: " +
        "For there can live no hatred in thine eye, " +
        "Therefore in that I cannot know thy change. " +
        "In many's looks, the false heart's history " +
        "Is writ in moods, and frowns, and wrinkles strange. " +
        "But heaven in thy creation did decree " +
        "That in thy face sweet love should ever dwell; " +
        "Whate'er thy thoughts, or thy heart's workings be, " +
        "Thy looks should nothing thence, but sweetness tell. " +
        "  How like Eve's apple doth thy beauty grow, " +
        "  If thy sweet virtue answer not thy show! " +
        "They that have power to hurt, and will do none, " +
        "That do not do the thing they most do show, " +
        "Who, moving others, are themselves as stone, " +
        "Unmoved, cold, and to temptation slow; " +
        "They rightly do inherit heaven's graces, " +
        "And husband nature's riches from expense; " +
        "They are the lords and owners of their faces, " +
        "Others, but stewards of their excellence. " +
        "The summer's flower is to the summer sweet, " +
        "Though to itself, it only live and die, " +
        "But if that flower with base infection meet, " +
        "The basest weed outbraves his dignity: " +
        "  For sweetest things turn sourest by their deeds; " +
        "  Lilies that fester, smell far worse than weeds. " +
        "How sweet and lovely dost thou make the shame " +
        "Which, like a canker in the fragrant rose, " +
        "Doth spot the beauty of thy budding name! " +
        "O! in what sweets dost thou thy sins enclose. " +
        "That tongue that tells the story of thy days, " +
        "Making lascivious comments on thy sport, " +
        "Cannot dispraise, but in a kind of praise; " +
        "Naming thy name, blesses an ill report. " +
        "O! what a mansion have those vices got " +
        "Which for their habitation chose out thee, " +
        "Where beauty's veil doth cover every blot " +
        "And all things turns to fair that eyes can see! " +
        "  Take heed, dear heart, of this large privilege; " +
        "  The hardest knife ill-us'd doth lose his edge. " +
        "Some say thy fault is youth, some wantonness; " +
        "Some say thy grace is youth and gentle sport; " +
        "Both grace and faults are lov'd of more and less: " +
        "Thou mak'st faults graces that to thee resort. " +
        "As on the finger of a throned queen " +
        "The basest jewel will be well esteem'd, " +
        "So are those errors that in thee are seen " +
        "To truths translated, and for true things deem'd. " +
        "How many lambs might the stern wolf betray, " +
        "If like a lamb he could his looks translate! " +
        "How many gazers mightst thou lead away, " +
        "if thou wouldst use the strength of all thy state! " +
        "  But do not so; I love thee in such sort, " +
        "  As, thou being mine, mine is thy good report. " +
        "How like a winter hath my absence been " +
        "From thee, the pleasure of the fleeting year! " +
        "What freezings have I felt, what dark days seen! " +
        "What old December's bareness everywhere! " +
        "And yet this time removed was summer's time; " +
        "The teeming autumn, big with rich increase, " +
        "Bearing the wanton burden of the prime, " +
        "Like widow'd wombs after their lords decease: " +
        "Yet this abundant issue seem'd to me " +
        "But hope of orphans, and unfather'd fruit; " +
        "For summer and his pleasures wait on thee, " +
        "And, thou away, the very birds are mute: " +
        "  Or, if they sing, tis with so dull a cheer, " +
        "  That leaves look pale, dreading the winter's near. " +
        "From you have I been absent in the spring, " +
        "When proud-pied April, dress'd in all his trim, " +
        "Hath put a spirit of youth in every thing, " +
        "That heavy Saturn laugh'd and leap'd with him. " +
        "Yet nor the lays of birds, nor the sweet smell " +
        "Of different flowers in odour and in hue, " +
        "Could make me any summer's story tell, " +
        "Or from their proud lap pluck them where they grew: " +
        "Nor did I wonder at the lily's white, " +
        "Nor praise the deep vermilion in the rose; " +
        "They were but sweet, but figures of delight, " +
        "Drawn after you, you pattern of all those. " +
        "  Yet seem'd it winter still, and you away, " +
        "  As with your shadow I with these did play. " +
        "The forward violet thus did I chide: " +
        "Sweet thief, whence didst thou steal thy sweet that smells, " +
        "If not from my love's breath? The purple pride " +
        "Which on thy soft cheek for complexion dwells " +
        "In my love's veins thou hast too grossly dy'd. " +
        "The lily I condemned for thy hand, " +
        "And buds of marjoram had stol'n thy hair; " +
        "The roses fearfully on thorns did stand, " +
        "One blushing shame, another white despair; " +
        "A third, nor red nor white, had stol'n of both, " +
        "And to his robbery had annex'd thy breath; " +
        "But, for his theft, in pride of all his growth " +
        "A vengeful canker eat him up to death. " +
        "  More flowers I noted, yet I none could see, " +
        "  But sweet, or colour it had stol'n from thee. " +
        "Where art thou Muse that thou forget'st so long, " +
        "To speak of that which gives thee all thy might? " +
        "Spend'st thou thy fury on some worthless song, " +
        "Darkening thy power to lend base subjects light? " +
        "Return forgetful Muse, and straight redeem, " +
        "In gentle numbers time so idly spent; " +
        "Sing to the ear that doth thy lays esteem " +
        "And gives thy pen both skill and argument. " +
        "Rise, resty Muse, my love's sweet face survey, " +
        "If Time have any wrinkle graven there; " +
        "If any, be a satire to decay, " +
        "And make time's spoils despised every where. " +
        "  Give my love fame faster than Time wastes life, " +
        "  So thou prevent'st his scythe and crooked knife. " +
        "O truant Muse what shall be thy amends " +
        "For thy neglect of truth in beauty dy'd? " +
        "Both truth and beauty on my love depends; " +
        "So dost thou too, and therein dignified. " +
        "Make answer Muse: wilt thou not haply say, " +
        "Truth needs no colour, with his colour fix'd; " +
        "Beauty no pencil, beauty's truth to lay; " +
        "But best is best, if never intermix'd'? " +
        "Because he needs no praise, wilt thou be dumb? " +
        "Excuse not silence so, for't lies in thee " +
        "To make him much outlive a gilded tomb " +
        "And to be prais'd of ages yet to be. " +
        "  Then do thy office, Muse; I teach thee how " +
        "  To make him seem long hence as he shows now. " +
        "My love is strengthen'd, though more weak in seeming; " +
        "I love not less, though less the show appear; " +
        "That love is merchandiz'd, whose rich esteeming, " +
        "The owner's tongue doth publish every where. " +
        "Our love was new, and then but in the spring, " +
        "When I was wont to greet it with my lays; " +
        "As Philomel in summer's front doth sing, " +
        "And stops her pipe in growth of riper days: " +
        "Not that the summer is less pleasant now " +
        "Than when her mournful hymns did hush the night, " +
        "But that wild music burthens every bough, " +
        "And sweets grown common lose their dear delight. " +
        "  Therefore like her, I sometime hold my tongue: " +
        "  Because I would not dull you with my song. " +
        "Alack! what poverty my Muse brings forth, " +
        "That having such a scope to show her pride, " +
        "The argument, all bare, is of more worth " +
        "Than when it hath my added praise beside! " +
        "O! blame me not, if I no more can write! " +
        "Look in your glass, and there appears a face " +
        "That over-goes my blunt invention quite, " +
        "Dulling my lines, and doing me disgrace. " +
        "Were it not sinful then, striving to mend, " +
        "To mar the subject that before was well? " +
        "For to no other pass my verses tend " +
        "Than of your graces and your gifts to tell; " +
        "  And more, much more, than in my verse can sit, " +
        "  Your own glass shows you when you look in it. " +
        "To me, fair friend, you never can be old, " +
        "For as you were when first your eye I ey'd, " +
        "Such seems your beauty still. Three winters cold, " +
        "Have from the forests shook three summers pride, " +
        "Three beauteous springs to yellow autumn turn'd, " +
        "In process of the seasons have I seen, " +
        "Three April perfumes in three hot Junes burn'd, " +
        "Since first I saw you fresh, which yet are green. " +
        "Ah! yet doth beauty like a dial-hand, " +
        "Steal from his figure, and no pace perceiv'd; " +
        "So your sweet hue, which methinks still doth stand, " +
        "Hath motion, and mine eye may be deceiv'd: " +
        "  For fear of which, hear this thou age unbred: " +
        "  Ere you were born was beauty's summer dead. " +
        "Let not my love be call'd idolatry, " +
        "Nor my beloved as an idol show, " +
        "Since all alike my songs and praises be " +
        "To one, of one, still such, and ever so. " +
        "Kind is my love to-day, to-morrow kind, " +
        "Still constant in a wondrous excellence; " +
        "Therefore my verse to constancy confin'd, " +
        "One thing expressing, leaves out difference. " +
        "Fair, kind, and true, is all my argument, " +
        "Fair, kind, and true, varying to other words; " +
        "And in this change is my invention spent, " +
        "Three themes in one, which wondrous scope affords. " +
        "  Fair, kind, and true, have often liv'd alone, " +
        "  Which three till now, never kept seat in one. " +
        "When in the chronicle of wasted time " +
        "I see descriptions of the fairest wights, " +
        "And beauty making beautiful old rime, " +
        "In praise of ladies dead and lovely knights, " +
        "Then, in the blazon of sweet beauty's best, " +
        "Of hand, of foot, of lip, of eye, of brow, " +
        "I see their antique pen would have express'd " +
        "Even such a beauty as you master now. " +
        "So all their praises are but prophecies " +
        "Of this our time, all you prefiguring; " +
        "And for they looked but with divining eyes, " +
        "They had not skill enough your worth to sing: " +
        "  For we, which now behold these present days, " +
        "  Have eyes to wonder, but lack tongues to praise. " +
        "Not mine own fears, nor the prophetic soul " +
        "Of the wide world dreaming on things to come, " +
        "Can yet the lease of my true love control, " +
        "Supposed as forfeit to a confin'd doom. " +
        "The mortal moon hath her eclipse endur'd, " +
        "And the sad augurs mock their own presage; " +
        "Incertainties now crown themselves assur'd, " +
        "And peace proclaims olives of endless age. " +
        "Now with the drops of this most balmy time, " +
        "My love looks fresh, and Death to me subscribes, " +
        "Since, spite of him, I'll live in this poor rime, " +
        "While he insults o'er dull and speechless tribes: " +
        "  And thou in this shalt find thy monument, " +
        "  When tyrants crests and tombs of brass are spent. " +
        "What's in the brain, that ink may character, " +
        "Which hath not figur'd to thee my true spirit? " +
        "What's new to speak, what now to register, " +
        "That may express my love, or thy dear merit? " +
        "Nothing, sweet boy; but yet, like prayers divine, " +
        "I must each day say o'er the very same; " +
        "Counting no old thing old, thou mine, I thine, " +
        "Even as when first I hallow'd thy fair name. " +
        "So that eternal love in love's fresh case, " +
        "Weighs not the dust and injury of age, " +
        "Nor gives to necessary wrinkles place, " +
        "But makes antiquity for aye his page; " +
        "  Finding the first conceit of love there bred, " +
        "  Where time and outward form would show it dead. " +
        "O! never say that I was false of heart, " +
        "Though absence seem'd my flame to qualify, " +
        "As easy might I from my self depart " +
        "As from my soul which in thy breast doth lie: " +
        "That is my home of love: if I have rang'd, " +
        "Like him that travels, I return again; " +
        "Just to the time, not with the time exchang'd, " +
        "So that myself bring water for my stain. " +
        "Never believe though in my nature reign'd, " +
        "All frailties that besiege all kinds of blood, " +
        "That it could so preposterously be stain'd, " +
        "To leave for nothing all thy sum of good; " +
        "  For nothing this wide universe I call, " +
        "  Save thou, my rose, in it thou art my all. " +
        "Alas! tis true, I have gone here and there, " +
        "And made my self a motley to the view, " +
        "Gor'd mine own thoughts, sold cheap what is most dear, " +
        "Made old offences of affections new; " +
        "Most true it is, that I have look'd on truth " +
        "Askance and strangely; but, by all above, " +
        "These blenches gave my heart another youth, " +
        "And worse essays prov'd thee my best of love. " +
        "Now all is done, save what shall have no end: " +
        "Mine appetite I never more will grind " +
        "On newer proof, to try an older friend, " +
        "A god in love, to whom I am confin'd. " +
        "  Then give me welcome, next my heaven the best, " +
        "  Even to thy pure and most most loving breast. " +
        "O! for my sake do you with Fortune chide, " +
        "The guilty goddess of my harmful deeds, " +
        "That did not better for my life provide " +
        "Than public means which public manners breeds. " +
        "Thence comes it that my name receives a brand, " +
        "And almost thence my nature is subdu'd " +
        "To what it works in, like the dyer's hand: " +
        "Pity me, then, and wish I were renew'd; " +
        "Whilst, like a willing patient, I will drink, " +
        "Potions of eisel gainst my strong infection; " +
        "No bitterness that I will bitter think, " +
        "Nor double penance, to correct correction. " +
        "  Pity me then, dear friend, and I assure ye, " +
        "  Even that your pity is enough to cure me. " +
        "Your love and pity doth the impression fill, " +
        "Which vulgar scandal stamp'd upon my brow; " +
        "For what care I who calls me well or ill, " +
        "So you o'er-green my bad, my good allow? " +
        "You are my all-the-world, and I must strive " +
        "To know my shames and praises from your tongue; " +
        "None else to me, nor I to none alive, " +
        "That my steel'd sense or changes right or wrong. " +
        "In so profound abysm I throw all care " +
        "Of others voices, that my adder's sense " +
        "To critic and to flatterer stopped are. " +
        "Mark how with my neglect I do dispense: " +
        "  You are so strongly in my purpose bred, " +
        "  That all the world besides methinks are dead. " +
        "Since I left you, mine eye is in my mind; " +
        "And that which governs me to go about " +
        "Doth part his function and is partly blind, " +
        "Seems seeing, but effectually is out; " +
        "For it no form delivers to the heart " +
        "Of bird, of flower, or shape which it doth latch: " +
        "Of his quick objects hath the mind no part, " +
        "Nor his own vision holds what it doth catch; " +
        "For if it see the rud'st or gentlest sight, " +
        "The most sweet favour or deformed'st creature, " +
        "The mountain or the sea, the day or night: " +
        "The crow, or dove, it shapes them to your feature. " +
        "  Incapable of more, replete with you, " +
        "  My most true mind thus maketh mine untrue. " +
        "Or whether doth my mind, being crown'd with you, " +
        "Drink up the monarch's plague, this flattery? " +
        "Or whether shall I say, mine eye saith true, " +
        "And that your love taught it this alchemy, " +
        "To make of monsters and things indigest " +
        "Such cherubins as your sweet self resemble, " +
        "Creating every bad a perfect best, " +
        "As fast as objects to his beams assemble? " +
        "O! tis the first, tis flattery in my seeing, " +
        "And my great mind most kingly drinks it up: " +
        "Mine eye well knows what with his gust is greeing, " +
        "And to his palate doth prepare the cup: " +
        "  If it be poison'd, tis the lesser sin " +
        "  That mine eye loves it and doth first begin. " +
        "Those lines that I before have writ do lie, " +
        "Even those that said I could not love you dearer: " +
        "Yet then my judgment knew no reason why " +
        "My most full flame should afterwards burn clearer. " +
        "But reckoning Time, whose million'd accidents " +
        "Creep in twixt vows, and change decrees of kings, " +
        "Tan sacred beauty, blunt the sharp'st intents, " +
        "Divert strong minds to the course of altering things; " +
        "Alas! why fearing of Time's tyranny, " +
        "Might I not then say, Now I love you best, " +
        "When I was certain o'er incertainty, " +
        "Crowning the present, doubting of the rest? " +
        "  Love is a babe, then might I not say so, " +
        "  To give full growth to that which still doth grow? " +
        "Let me not to the marriage of true minds " +
        "Admit impediments. Love is not love " +
        "Which alters when it alteration finds, " +
        "Or bends with the remover to remove: " +
        "O, no! it is an ever-fixed mark, " +
        "That looks on tempests and is never shaken; " +
        "It is the star to every wandering bark, " +
        "Whose worth's unknown, although his height be taken. " +
        "Love's not Time's fool, though rosy lips and cheeks " +
        "Within his bending sickle's compass come; " +
        "Love alters not with his brief hours and weeks, " +
        "But bears it out even to the edge of doom. " +
        "  If this be error and upon me prov'd, " +
        "  I never writ, nor no man ever lov'd. " +
        "Accuse me thus: that I have scanted all, " +
        "Wherein I should your great deserts repay, " +
        "Forgot upon your dearest love to call, " +
        "Whereto all bonds do tie me day by day; " +
        "That I have frequent been with unknown minds, " +
        "And given to time your own dear-purchas'd right; " +
        "That I have hoisted sail to all the winds " +
        "Which should transport me farthest from your sight. " +
        "Book both my wilfulness and errors down, " +
        "And on just proof surmise, accumulate; " +
        "Bring me within the level of your frown, " +
        "But shoot not at me in your waken'd hate; " +
        "  Since my appeal says I did strive to prove " +
        "  The constancy and virtue of your love. " +
        "Like as, to make our appetite more keen, " +
        "With eager compounds we our palate urge; " +
        "As, to prevent our maladies unseen, " +
        "We sicken to shun sickness when we purge; " +
        "Even so, being full of your ne'er-cloying sweetness, " +
        "To bitter sauces did I frame my feeding; " +
        "And, sick of welfare, found a kind of meetness " +
        "To be diseas'd, ere that there was true needing. " +
        "Thus policy in love, to anticipate " +
        "The ills that were not, grew to faults assur'd, " +
        "And brought to medicine a healthful state " +
        "Which, rank of goodness, would by ill be cur'd; " +
        "  But thence I learn and find the lesson true, " +
        "  Drugs poison him that so fell sick of you. " +
        "What potions have I drunk of Siren tears, " +
        "Distill'd from limbecks foul as hell within, " +
        "Applying fears to hopes, and hopes to fears, " +
        "Still losing when I saw myself to win! " +
        "What wretched errors hath my heart committed, " +
        "Whilst it hath thought itself so blessed never! " +
        "How have mine eyes out of their spheres been fitted, " +
        "In the distraction of this madding fever! " +
        "O benefit of ill! now I find true " +
        "That better is, by evil still made better; " +
        "And ruin'd love, when it is built anew, " +
        "Grows fairer than at first, more strong, far greater. " +
        "  So I return rebuk'd to my content, " +
        "  And gain by ill thrice more than I have spent. " +
        "That you were once unkind befriends me now, " +
        "And for that sorrow, which I then did feel, " +
        "Needs must I under my transgression bow, " +
        "Unless my nerves were brass or hammer'd steel. " +
        "For if you were by my unkindness shaken, " +
        "As I by yours, you've pass'd a hell of time; " +
        "And I, a tyrant, have no leisure taken " +
        "To weigh how once I suffer'd in your crime. " +
        "O! that our night of woe might have remember'd " +
        "My deepest sense, how hard true sorrow hits, " +
        "And soon to you, as you to me, then tender'd " +
        "The humble salve, which wounded bosoms fits! " +
        "  But that your trespass now becomes a fee; " +
        "  Mine ransoms yours, and yours must ransom me. " +
        "Tis better to be vile than vile esteem'd, " +
        "When not to be receives reproach of being; " +
        "And the just pleasure lost, which is so deem'd " +
        "Not by our feeling, but by others seeing: " +
        "For why should others false adulterate eyes " +
        "Give salutation to my sportive blood? " +
        "Or on my frailties why are frailer spies, " +
        "Which in their wills count bad what I think good? " +
        "No, I am that I am, and they that level " +
        "At my abuses reckon up their own: " +
        "I may be straight though they themselves be bevel; " +
        "By their rank thoughts, my deeds must not be shown; " +
        "  Unless this general evil they maintain, " +
        "  All men are bad and in their badness reign. " +
        "Thy gift, thy tables, are within my brain " +
        "Full character'd with lasting memory, " +
        "Which shall above that idle rank remain, " +
        "Beyond all date; even to eternity: " +
        "Or, at the least, so long as brain and heart " +
        "Have faculty by nature to subsist; " +
        "Till each to raz'd oblivion yield his part " +
        "Of thee, thy record never can be miss'd. " +
        "That poor retention could not so much hold, " +
        "Nor need I tallies thy dear love to score; " +
        "Therefore to give them from me was I bold, " +
        "To trust those tables that receive thee more: " +
        "  To keep an adjunct to remember thee " +
        "  Were to import forgetfulness in me. " +
        "No, Time, thou shalt not boast that I do change: " +
        "Thy pyramids built up with newer might " +
        "To me are nothing novel, nothing strange; " +
        "They are but dressings of a former sight. " +
        "Our dates are brief, and therefore we admire " +
        "What thou dost foist upon us that is old; " +
        "And rather make them born to our desire " +
        "Than think that we before have heard them told. " +
        "Thy registers and thee I both defy, " +
        "Not wondering at the present nor the past, " +
        "For thy records and what we see doth lie, " +
        "Made more or less by thy continual haste. " +
        "  This I do vow and this shall ever be; " +
        "  I will be true despite thy scythe and thee. " +
        "If my dear love were but the child of state, " +
        "It might for Fortune's bastard be unfather'd, " +
        "As subject to Time's love or to Time's hate, " +
        "Weeds among weeds, or flowers with flowers gather'd. " +
        "No, it was builded far from accident; " +
        "It suffers not in smiling pomp, nor falls " +
        "Under the blow of thralled discontent, " +
        "Whereto th inviting time our fashion calls: " +
        "It fears not policy, that heretic, " +
        "Which works on leases of short-number'd hours, " +
        "But all alone stands hugely politic, " +
        "That it nor grows with heat, nor drowns with showers. " +
        "  To this I witness call the fools of time, " +
        "  Which die for goodness, who have lived for crime. " +
        "Were't aught to me I bore the canopy, " +
        "With my extern the outward honouring, " +
        "Or laid great bases for eternity, " +
        "Which proves more short than waste or ruining? " +
        "Have I not seen dwellers on form and favour " +
        "Lose all and more by paying too much rent " +
        "For compound sweet; forgoing simple savour, " +
        "Pitiful thrivers, in their gazing spent? " +
        "No; let me be obsequious in thy heart, " +
        "And take thou my oblation, poor but free, " +
        "Which is not mix'd with seconds, knows no art, " +
        "But mutual render, only me for thee. " +
        "  Hence, thou suborned informer! a true soul " +
        "  When most impeach'd, stands least in thy control. " +
        "O thou, my lovely boy, who in thy power " +
        "Dost hold Time's fickle glass, his fickle hour; " +
        "Who hast by waning grown, and therein show'st " +
        "Thy lovers withering, as thy sweet self grow'st. " +
        "If Nature, sovereign mistress over wrack, " +
        "As thou goest onwards, still will pluck thee back, " +
        "She keeps thee to this purpose, that her skill " +
        "May time disgrace and wretched minutes kill. " +
        "Yet fear her, O thou minion of her pleasure! " +
        "She may detain, but not still keep, her treasure: " +
        "  Her audit (though delayed) answered must be, " +
        "  And her quietus is to render thee. " +
        "In the old age black was not counted fair, " +
        "Or if it were, it bore not beauty's name; " +
        "But now is black beauty's successive heir, " +
        "And beauty slander'd with a bastard shame: " +
        "For since each hand hath put on Nature's power, " +
        "Fairing the foul with Art's false borrowed face, " +
        "Sweet beauty hath no name, no holy bower, " +
        "But is profan'd, if not lives in disgrace. " +
        "Therefore my mistress eyes are raven black, " +
        "Her eyes so suited, and they mourners seem " +
        "At such who, not born fair, no beauty lack, " +
        "Sland'ring creation with a false esteem: " +
        "  Yet so they mourn becoming of their woe, " +
        "  That every tongue says beauty should look so. " +
        "How oft when thou, my music, music play'st, " +
        "Upon that blessed wood whose motion sounds " +
        "With thy sweet fingers when thou gently sway'st " +
        "The wiry concord that mine ear confounds, " +
        "Do I envy those jacks that nimble leap, " +
        "To kiss the tender inward of thy hand, " +
        "Whilst my poor lips which should that harvest reap, " +
        "At the wood's boldness by thee blushing stand! " +
        "To be so tickled, they would change their state " +
        "And situation with those dancing chips, " +
        "O'er whom thy fingers walk with gentle gait, " +
        "Making dead wood more bless'd than living lips. " +
        "  Since saucy jacks so happy are in this, " +
        "  Give them thy fingers, me thy lips to kiss. " +
        "The expense of spirit in a waste of shame " +
        "Is lust in action: and till action, lust " +
        "Is perjur'd, murderous, bloody, full of blame, " +
        "Savage, extreme, rude, cruel, not to trust; " +
        "Enjoy'd no sooner but despised straight; " +
        "Past reason hunted; and no sooner had, " +
        "Past reason hated, as a swallow'd bait, " +
        "On purpose laid to make the taker mad: " +
        "Mad in pursuit and in possession so; " +
        "Had, having, and in quest, to have extreme; " +
        "A bliss in proof,-- and prov'd, a very woe; " +
        "Before, a joy propos'd; behind a dream. " +
        "  All this the world well knows; yet none knows well " +
        "  To shun the heaven that leads men to this hell. " +
        "My mistress eyes are nothing like the sun; " +
        "Coral is far more red, than her lips red: " +
        "If snow be white, why then her breasts are dun; " +
        "If hairs be wires, black wires grow on her head. " +
        "I have seen roses damask'd, red and white, " +
        "But no such roses see I in her cheeks; " +
        "And in some perfumes is there more delight " +
        "Than in the breath that from my mistress reeks. " +
        "I love to hear her speak, yet well I know " +
        "That music hath a far more pleasing sound: " +
        "I grant I never saw a goddess go,-- " +
        "My mistress, when she walks, treads on the ground: " +
        "  And yet by heaven, I think my love as rare, " +
        "  As any she belied with false compare. " +
        "Thou art as tyrannous, so as thou art, " +
        "As those whose beauties proudly make them cruel; " +
        "For well thou know'st to my dear doting heart " +
        "Thou art the fairest and most precious jewel. " +
        "Yet, in good faith, some say that thee behold, " +
        "Thy face hath not the power to make love groan; " +
        "To say they err I dare not be so bold, " +
        "Although I swear it to myself alone. " +
        "And to be sure that is not false I swear, " +
        "A thousand groans, but thinking on thy face, " +
        "One on another's neck, do witness bear " +
        "Thy black is fairest in my judgment's place. " +
        "  In nothing art thou black save in thy deeds, " +
        "  And thence this slander, as I think, proceeds. " +
        "Thine eyes I love, and they, as pitying me, " +
        "Knowing thy heart torment me with disdain, " +
        "Have put on black and loving mourners be, " +
        "Looking with pretty ruth upon my pain. " +
        "And truly not the morning sun of heaven " +
        "Better becomes the grey cheeks of the east, " +
        "Nor that full star that ushers in the even, " +
        "Doth half that glory to the sober west, " +
        "As those two mourning eyes become thy face: " +
        "O! let it then as well beseem thy heart " +
        "To mourn for me since mourning doth thee grace, " +
        "And suit thy pity like in every part. " +
        "  Then will I swear beauty herself is black, " +
        "  And all they foul that thy complexion lack. " +
        "Beshrew that heart that makes my heart to groan " +
        "For that deep wound it gives my friend and me! " +
        "Is't not enough to torture me alone, " +
        "But slave to slavery my sweet'st friend must be? " +
        "Me from myself thy cruel eye hath taken, " +
        "And my next self thou harder hast engross'd: " +
        "Of him, myself, and thee I am forsaken; " +
        "A torment thrice three-fold thus to be cross'd: " +
        "Prison my heart in thy steel bosom's ward, " +
        "But then my friend's heart let my poor heart bail; " +
        "Whoe'er keeps me, let my heart be his guard; " +
        "Thou canst not then use rigour in my jail: " +
        "  And yet thou wilt; for I, being pent in thee, " +
        "  Perforce am thine, and all that is in me. " +
        "So, now I have confess'd that he is thine, " +
        "And I my self am mortgag'd to thy will, " +
        "Myself I'll forfeit, so that other mine " +
        "Thou wilt restore to be my comfort still: " +
        "But thou wilt not, nor he will not be free, " +
        "For thou art covetous, and he is kind; " +
        "He learn'd but surety-like to write for me, " +
        "Under that bond that him as fast doth bind. " +
        "The statute of thy beauty thou wilt take, " +
        "Thou usurer, that putt'st forth all to use, " +
        "And sue a friend came debtor for my sake; " +
        "So him I lose through my unkind abuse. " +
        "  Him have I lost; thou hast both him and me: " +
        "  He pays the whole, and yet am I not free. " +
        "Whoever hath her wish, thou hast thy Will, " +
        "And Will to boot, and Will in over-plus; " +
        "More than enough am I that vex'd thee still, " +
        "To thy sweet will making addition thus. " +
        "Wilt thou, whose will is large and spacious, " +
        "Not once vouchsafe to hide my will in thine? " +
        "Shall will in others seem right gracious, " +
        "And in my will no fair acceptance shine? " +
        "The sea, all water, yet receives rain still, " +
        "And in abundance addeth to his store; " +
        "So thou, being rich in Will, add to thy Will " +
        "One will of mine, to make thy large will more. " +
        "  Let no unkind No fair beseechers kill; " +
        "  Think all but one, and me in that one Will. " +
        "If thy soul check thee that I come so near, " +
        "Swear to thy blind soul that I was thy Will', " +
        "And will, thy soul knows, is admitted there; " +
        "Thus far for love, my love-suit, sweet, fulfil. " +
        "Will', will fulfil the treasure of thy love, " +
        "Ay, fill it full with wills, and my will one. " +
        "In things of great receipt with ease we prove " +
        "Among a number one is reckon'd none: " +
        "Then in the number let me pass untold, " +
        "Though in thy store's account I one must be; " +
        "For nothing hold me, so it please thee hold " +
        "That nothing me, a something sweet to thee: " +
        "  Make but my name thy love, and love that still, " +
        "  And then thou lov'st me for my name is Will. " +
        "Thou blind fool, Love, what dost thou to mine eyes, " +
        "That they behold, and see not what they see? " +
        "They know what beauty is, see where it lies, " +
        "Yet what the best is take the worst to be. " +
        "If eyes, corrupt by over-partial looks, " +
        "Be anchor'd in the bay where all men ride, " +
        "Why of eyes falsehood hast thou forged hooks, " +
        "Whereto the judgment of my heart is tied? " +
        "Why should my heart think that a several plot, " +
        "Which my heart knows the wide world's common place? " +
        "Or mine eyes, seeing this, say this is not, " +
        "To put fair truth upon so foul a face? " +
        "  In things right true my heart and eyes have err'd, " +
        "  And to this false plague are they now transferr'd. " +
        "When my love swears that she is made of truth, " +
        "I do believe her though I know she lies, " +
        "That she might think me some untutor'd youth, " +
        "Unlearned in the world's false subtleties. " +
        "Thus vainly thinking that she thinks me young, " +
        "Although she knows my days are past the best, " +
        "Simply I credit her false-speaking tongue: " +
        "On both sides thus is simple truth suppressed: " +
        "But wherefore says she not she is unjust? " +
        "And wherefore say not I that I am old? " +
        "O! love's best habit is in seeming trust, " +
        "And age in love, loves not to have years told: " +
        "  Therefore I lie with her, and she with me, " +
        "  And in our faults by lies we flatter'd be. " +
        "O! call not me to justify the wrong " +
        "That thy unkindness lays upon my heart; " +
        "Wound me not with thine eye, but with thy tongue: " +
        "Use power with power, and slay me not by art, " +
        "Tell me thou lov'st elsewhere; but in my sight, " +
        "Dear heart, forbear to glance thine eye aside: " +
        "What need'st thou wound with cunning, when thy might " +
        "Is more than my o'erpress'd defence can bide? " +
        "Let me excuse thee: ah! my love well knows " +
        "Her pretty looks have been mine enemies; " +
        "And therefore from my face she turns my foes, " +
        "That they elsewhere might dart their injuries: " +
        "  Yet do not so; but since I am near slain, " +
        "  Kill me outright with looks, and rid my pain. " +
        "Be wise as thou art cruel; do not press " +
        "My tongue-tied patience with too much disdain; " +
        "Lest sorrow lend me words, and words express " +
        "The manner of my pity-wanting pain. " +
        "If I might teach thee wit, better it were, " +
        "Though not to love, yet, love to tell me so;-- " +
        "As testy sick men, when their deaths be near, " +
        "No news but health from their physicians know;-- " +
        "For, if I should despair, I should grow mad, " +
        "And in my madness might speak ill of thee; " +
        "Now this ill-wresting world is grown so bad, " +
        "Mad slanderers by mad ears believed be. " +
        "  That I may not be so, nor thou belied, " +
        "  Bear thine eyes straight, though thy proud heart go wide. " +
        "In faith I do not love thee with mine eyes, " +
        "For they in thee a thousand errors note; " +
        "But tis my heart that loves what they despise, " +
        "Who, in despite of view, is pleased to dote. " +
        "Nor are mine ears with thy tongue's tune delighted; " +
        "Nor tender feeling, to base touches prone, " +
        "Nor taste, nor smell, desire to be invited " +
        "To any sensual feast with thee alone: " +
        "But my five wits nor my five senses can " +
        "Dissuade one foolish heart from serving thee, " +
        "Who leaves unsway'd the likeness of a man, " +
        "Thy proud heart's slave and vassal wretch to be: " +
        "  Only my plague thus far I count my gain, " +
        "  That she that makes me sin awards me pain. " +
        "Love is my sin, and thy dear virtue hate, " +
        "Hate of my sin, grounded on sinful loving: " +
        "O! but with mine compare thou thine own state, " +
        "And thou shalt find it merits not reproving; " +
        "Or, if it do, not from those lips of thine, " +
        "That have profan'd their scarlet ornaments " +
        "And seal'd false bonds of love as oft as mine, " +
        "Robb'd others beds revenues of their rents. " +
        "Be it lawful I love thee, as thou lov'st those " +
        "Whom thine eyes woo as mine importune thee: " +
        "Root pity in thy heart, that, when it grows, " +
        "Thy pity may deserve to pitied be. " +
        "  If thou dost seek to have what thou dost hide, " +
        "  By self-example mayst thou be denied! " +
        "Lo, as a careful housewife runs to catch " +
        "One of her feather'd creatures broke away, " +
        "Sets down her babe, and makes all swift dispatch " +
        "In pursuit of the thing she would have stay; " +
        "Whilst her neglected child holds her in chase, " +
        "Cries to catch her whose busy care is bent " +
        "To follow that which flies before her face, " +
        "Not prizing her poor infant's discontent; " +
        "So runn'st thou after that which flies from thee, " +
        "Whilst I thy babe chase thee afar behind; " +
        "But if thou catch thy hope, turn back to me, " +
        "And play the mother's part, kiss me, be kind; " +
        "  So will I pray that thou mayst have thy Will, " +
        "  If thou turn back and my loud crying still. " +
        "Two loves I have of comfort and despair, " +
        "Which like two spirits do suggest me still: " +
        "The better angel is a man right fair, " +
        "The worser spirit a woman colour'd ill. " +
        "To win me soon to hell, my female evil, " +
        "Tempteth my better angel from my side, " +
        "And would corrupt my saint to be a devil, " +
        "Wooing his purity with her foul pride. " +
        "And whether that my angel be turn'd fiend, " +
        "Suspect I may, yet not directly tell; " +
        "But being both from me, both to each friend, " +
        "I guess one angel in another's hell: " +
        "  Yet this shall I ne'er know, but live in doubt, " +
        "  Till my bad angel fire my good one out. " +
        "Those lips that Love's own hand did make, " +
        "Breathed forth the sound that said I hate', " +
        "To me that languish'd for her sake: " +
        "But when she saw my woeful state, " +
        "Straight in her heart did mercy come, " +
        "Chiding that tongue that ever sweet " +
        "Was us'd in giving gentle doom; " +
        "And taught it thus anew to greet; " +
        "I hate she alter'd with an end, " +
        "That followed it as gentle day, " +
        "Doth follow night, who like a fiend " +
        "From heaven to hell is flown away. " +
        "  I hate', from hate away she threw, " +
        "  And sav'd my life, saying not you'. " +
        "Poor soul, the centre of my sinful earth, " +
        "My sinful earth these rebel powers array, " +
        "Why dost thou pine within and suffer dearth, " +
        "Painting thy outward walls so costly gay? " +
        "Why so large cost, having so short a lease, " +
        "Dost thou upon thy fading mansion spend? " +
        "Shall worms, inheritors of this excess, " +
        "Eat up thy charge? Is this thy body's end? " +
        "Then soul, live thou upon thy servant's loss, " +
        "And let that pine to aggravate thy store; " +
        "Buy terms divine in selling hours of dross; " +
        "Within be fed, without be rich no more: " +
        "  So shall thou feed on Death, that feeds on men, " +
        "  And Death once dead, there's no more dying then. " +
        "My love is as a fever longing still, " +
        "For that which longer nurseth the disease; " +
        "Feeding on that which doth preserve the ill, " +
        "The uncertain sickly appetite to please. " +
        "My reason, the physician to my love, " +
        "Angry that his prescriptions are not kept, " +
        "Hath left me, and I desperate now approve " +
        "Desire is death, which physic did except. " +
        "Past cure I am, now Reason is past care, " +
        "And frantic-mad with evermore unrest; " +
        "My thoughts and my discourse as madmen's are, " +
        "At random from the truth vainly express'd; " +
        "  For I have sworn thee fair, and thought thee bright, " +
        "  Who art as black as hell, as dark as night. " +
        "O me! what eyes hath Love put in my head, " +
        "Which have no correspondence with true sight; " +
        "Or, if they have, where is my judgment fled, " +
        "That censures falsely what they see aright? " +
        "If that be fair whereon my false eyes dote, " +
        "What means the world to say it is not so? " +
        "If it be not, then love doth well denote " +
        "Love's eye is not so true as all men's: no, " +
        "How can it? O! how can Love's eye be true, " +
        "That is so vexed with watching and with tears? " +
        "No marvel then, though I mistake my view; " +
        "The sun itself sees not, till heaven clears. " +
        "  O cunning Love! with tears thou keep'st me blind, " +
        "  Lest eyes well-seeing thy foul faults should find. " +
        "Canst thou, O cruel! say I love thee not, " +
        "When I against myself with thee partake? " +
        "Do I not think on thee, when I forgot " +
        "Am of my self, all tyrant, for thy sake? " +
        "Who hateth thee that I do call my friend, " +
        "On whom frown'st thou that I do fawn upon, " +
        "Nay, if thou lour'st on me, do I not spend " +
        "Revenge upon myself with present moan? " +
        "What merit do I in my self respect, " +
        "That is so proud thy service to despise, " +
        "When all my best doth worship thy defect, " +
        "Commanded by the motion of thine eyes? " +
        "  But, love, hate on, for now I know thy mind,; " +
        "  Those that can see thou lov'st, and I am blind. " +
        "O! from what power hast thou this powerful might, " +
        "With insufficiency my heart to sway? " +
        "To make me give the lie to my true sight, " +
        "And swear that brightness doth not grace the day? " +
        "Whence hast thou this becoming of things ill, " +
        "That in the very refuse of thy deeds " +
        "There is such strength and warrantise of skill, " +
        "That, in my mind, thy worst all best exceeds? " +
        "Who taught thee how to make me love thee more, " +
        "The more I hear and see just cause of hate? " +
        "O! though I love what others do abhor, " +
        "With others thou shouldst not abhor my state: " +
        "  If thy unworthiness rais'd love in me, " +
        "  More worthy I to be belov'd of thee. " +
        "Love is too young to know what conscience is, " +
        "Yet who knows not conscience is born of love? " +
        "Then, gentle cheater, urge not my amiss, " +
        "Lest guilty of my faults thy sweet self prove: " +
        "For, thou betraying me, I do betray " +
        "My nobler part to my gross body's treason; " +
        "My soul doth tell my body that he may " +
        "Triumph in love; flesh stays no farther reason, " +
        "But rising at thy name doth point out thee, " +
        "As his triumphant prize. Proud of this pride, " +
        "He is contented thy poor drudge to be, " +
        "To stand in thy affairs, fall by thy side. " +
        "  No want of conscience hold it that I call " +
        "  Her love, for whose dear love I rise and fall. " +
        "In loving thee thou know'st I am forsworn, " +
        "But thou art twice forsworn, to me love swearing; " +
        "In act thy bed-vow broke, and new faith torn, " +
        "In vowing new hate after new love bearing: " +
        "But why of two oaths breach do I accuse thee, " +
        "When I break twenty? I am perjur'd most; " +
        "For all my vows are oaths but to misuse thee, " +
        "And all my honest faith in thee is lost: " +
        "For I have sworn deep oaths of thy deep kindness, " +
        "Oaths of thy love, thy truth, thy constancy; " +
        "And, to enlighten thee, gave eyes to blindness, " +
        "Or made them swear against the thing they see; " +
        "  For I have sworn thee fair; more perjur'd I, " +
        "  To swear against the truth so foul a lie. " +
        "Cupid laid by his brand and fell asleep: " +
        "A maid of Dian's this advantage found, " +
        "And his love-kindling fire did quickly steep " +
        "In a cold valley-fountain of that ground; " +
        "Which borrow'd from this holy fire of Love, " +
        "A dateless lively heat, still to endure, " +
        "And grew a seeting bath, which yet men prove " +
        "Against strange maladies a sovereign cure. " +
        "But at my mistress eye Love's brand new-fired, " +
        "The boy for trial needs would touch my breast; " +
        "I, sick withal, the help of bath desired, " +
        "And thither hied, a sad distemper'd guest, " +
        "  But found no cure, the bath for my help lies " +
        "  Where Cupid got new fire; my mistress eyes. " +
        "The little Love-god lying once asleep, " +
        "Laid by his side his heart-inflaming brand, " +
        "Whilst many nymphs that vow'd chaste life to keep " +
        "Came tripping by; but in her maiden hand " +
        "The fairest votary took up that fire " +
        "Which many legions of true hearts had warm'd; " +
        "And so the general of hot desire " +
        "Was, sleeping, by a virgin hand disarm'd. " +
        "This brand she quenched in a cool well by, " +
        "Which from Love's fire took heat perpetual, " +
        "Growing a bath and healthful remedy, " +
        "For men diseas'd; but I, my mistress thrall, " +
        "  Came there for cure and this by that I prove, " +
        "  Love's fire heats water, water cools not love.";


    var tristantzara = "// Tristan Tzara - To Make a Dadaist Poem " +
        "Take a newspaper. " +
        "Take some scissors. " +
        "Choose from this paper an article of the length you want to make your poem. " +
        "Cut out the article. " +
        "Next carefully cut out each of the words that makes up this article and put them all in a bag. " +
        "Shake gently. " +
        "Next take out each cutting one after the other. " +
        "Copy conscientiously in the order in which they left the bag. " +
        "The poem will resemble you. " +
        "And there you are - an infinitely original author of charming sensibility, even though unappreciated by the vulgar herd.";

    var lessig = '// Lawrence Lessig - Free Culture - Ch 2: "Mere Copyists' +
        '' +
        '*In 1839,* Louis Daguerre invented the first practical technology for producing' +
        'what we would call "photographs." Appropriately enough, they were called' +
        '"daguerreotypes." The process was complicated and expensive, and the field was' +
        'thus limited to professionals and a few zealous and wealthy amateurs. (There' +
        'was even an American Daguerre Association that helped regulate the industry, as' +
        'do all such associations, by keeping competition down so as to keep prices up.)' +
        '' +
        'Yet despite high prices, the demand for daguerreotypes was strong. This pushed' +
        'inventors to find simpler and cheaper ways to make "automatic pictures."' +
        'William Talbot soon discovered a process for making "negatives." But because' +
        'the negatives were glass, and had to be kept wet, the process still remained' +
        'expensive and cumbersome. In the 1870s, dry plates were developed, making it' +
        'easier to separate the taking of a picture from its developing. These were' +
        'still plates of glass, and thus it was still not a process within reach of most' +
        'amateurs.' +
        '' +
        'The technological change that made mass photography possible didn\'t happen' +
        'until 1888, and was the creation of a single man. George Eastman, himself an' +
        'amateur photographer, was frustrated by the technology of photographs made with' +
        'plates. In a flash of insight (so to speak), Eastman saw that if the film could' +
        'be made to be flexible, it could be held on a single spindle. That roll could' +
        'then be sent to a developer, driving the costs of photography down' +
        'substantially. By lowering the costs, Eastman expected he could dramatically' +
        'broaden the population of photographers.' +
        '' +
        'Eastman developed flexible, emulsion-coated paper film and placed rolls of it' +
        'in small, simple cameras: the Kodak. The device was marketed on the basis of' +
        'its simplicity. "You press the button and we do the rest."[^26] As he described' +
        'in /The Kodak Primer/:' +
        '' +
        '  The principle of the Kodak system is the separation of the work that any' +
        '  person whomsoever can do in making a photograph, from the work that only an' +
        '  expert can do. ... We furnish anybody, man, woman or child, who has' +
        '  sufficient intelligence to point a box straight and press a button, with an' +
        '  instrument which altogether removes from the practice of photography the' +
        '  necessity for exceptional facilities or, in fact, any special knowledge of' +
        '  the art. It can be employed without preliminary study, without a darkroom and' +
        '  without chemicals.[^27]' +
        '' +
        'For $25, anyone could make pictures. The camera came preloaded with film, and' +
        'when it had been used, the camera was returned to an Eastman factory, where the' +
        'film was developed. Over time, of course, the cost of the camera and the ease' +
        'with which it could be used both improved. Roll film thus became the basis for' +
        'the explosive growth of popular photography. Eastman\'s camera first went on' +
        'sale in 1888; one year later, Kodak was printing more than six thousand' +
        'negatives a day. From 1888 through 1909, while industrial production was rising' +
        'by 4.7 percent, photographic equipment and material sales increased by 11' +
        'percent.[^28] Eastman Kodak\'s sales during the same period experienced an' +
        'average annual increase of over 17 percent.[^29]' +
        '' +
        'The real significance of Eastman\'s invention, however, was not economic. It was' +
        'social. Professional photography gave individuals a glimpse of places they' +
        'would never otherwise see. Amateur photography gave them the ability to record' +
        'their own lives in a way they had never been able to do before. As author Brian' +
        'Coe notes, "For the first time the snapshot album provided the man on the' +
        'street with a permanent record of his family and its activities. ... For the' +
        'first time in history there exists an authentic visual record of the appearance' +
        'and activities of the common man made without [literary] interpretation or' +
        'bias."[^30]' +
        '' +
        'In this way, the Kodak camera and film were technologies of expression. The' +
        'pencil or paintbrush was also a technology of expression, of course. But it' +
        'took years of training before they could be deployed by amateurs in any useful' +
        'or effective way. With the Kodak, expression was possible much sooner and more' +
        'simply. The barrier to expression was lowered. Snobs would sneer at its' +
        '"quality"; professionals would discount it as irrelevant. But watch a child' +
        'study how best to frame a picture and you get a sense of the experience of' +
        'creativity that the Kodak enabled. Democratic tools gave ordinary people a way' +
        'to express themselves more easily than any tools could have before.' +
        '' +
        'What was required for this technology to flourish? Obviously, Eastman\'s genius' +
        'was an important part. But also important was the legal environment within' +
        'which Eastman\'s invention grew. For early in the history of photography, there' +
        'was a series of judicial decisions that could well have changed the course of' +
        'photography substantially. Courts were asked whether the photographer, amateur' +
        'or professional, required permission before he could capture and print whatever' +
        'image he wanted. Their answer was no.[^31]' +
        '' +
        'The arguments in favor of requiring permission will sound surprisingly' +
        'familiar. The photographer was "taking" something from the person or building' +
        'whose photograph he shot - pirating something of value. Some even thought he' +
        'was taking the target\'s soul. Just as Disney was not free to take the pencils' +
        'that his animators used to draw Mickey, so, too, should these photographers not' +
        'be free to take images that they thought valuable.' +
        '' +
        'On the other side was an argument that should be familiar, as well. Sure, there' +
        'may be something of value being used. But citizens should have the right to' +
        'capture at least those images that stand in public view. (Louis Brandeis, who' +
        'would become a Supreme Court Justice, thought the rule should be different for' +
        'images from private spaces.[^32]) It may be that this means that the' +
        'photographer gets something for nothing. Just as Disney could take inspiration' +
        'from /Steamboat Bill, Jr./ or the Brothers Grimm, the photographer should be' +
        'free to capture an image without compensating the source.' +
        '' +
        'Fortunately for Mr. Eastman, and for photography in general, these early' +
        'decisions went in favor of the pirates. In general, no permission would be' +
        'required before an image could be captured and shared with others. Instead,' +
        'permission was presumed. Freedom was the default. (The law would eventually' +
        'craft an exception for famous people: commercial photographers who snap' +
        'pictures of famous people for commercial purposes have more restrictions than' +
        'the rest of us. But in the ordinary case, the image can be captured without' +
        'clearing the rights to do the capturing.[^33])' +
        '' +
        'We can only speculate about how photography would have developed had the law' +
        'gone the other way. If the presumption had been against the photographer, then' +
        'the photographer would have had to demonstrate permission. Perhaps Eastman' +
        'Kodak would have had to demonstrate permission, too, before it developed the' +
        'film upon which images were captured. After all, if permission were not' +
        'granted, then Eastman Kodak would be benefiting from the "theft" committed by' +
        'the photographer. Just as Napster benefited from the copyright infringements' +
        'committed by Napster users, Kodak would be benefiting from the "image-right"' +
        'infringement of its photographers. We could imagine the law then requiring that' +
        'some form of permission be demonstrated before a company developed pictures. We' +
        'could imagine a system developing to demonstrate that permission.' +
        '' +
        'But though we could imagine this system of permission, it would be very hard to' +
        'see how photography could have flourished as it did if the requirement for' +
        'permission had been built into the rules that govern it. Photography would have' +
        'existed. It would have grown in importance over time. Professionals would have' +
        'continued to use the technology as they did - since professionals could have' +
        'more easily borne the burdens of the permission system. But the spread of' +
        'photography to ordinary people would not have occurred. Nothing like that' +
        'growth would have been realized. And certainly, nothing like that growth in a' +
        'democratic technology of expression would have been realized.' +
        '' +
        '*If you drive* through San Francisco\'s Presidio, you might see two gaudy yellow' +
        'school buses painted over with colorful and striking images, and the logo "Just' +
        'Think!" in place of the name of a school. But there\'s little that\'s "just"' +
        'cerebral in the projects that these busses enable. These buses are filled with' +
        'technologies that teach kids to tinker with film. Not the film of Eastman. Not' +
        'even the film of your VCR. Rather the "film" of digital cameras. Just Think! is' +
        'a project that enables kids to make films, as a way to understand and critique' +
        'the filmed culture that they find all around them. Each year, these busses' +
        'travel to more than thirty schools and enable three hundred to five hundred' +
        'children to learn something about media by doing something with media. By' +
        'doing, they think. By tinkering, they learn.' +
        '' +
        'These buses are not cheap, but the technology they carry is increasingly so.' +
        'The cost of a high-quality digital video system has fallen dramatically. As one' +
        'analyst puts it, "Five years ago, a good real-time digital video editing system' +
        'cost $25,000. Today you can get professional quality for $595."[^34] These' +
        'buses are filled with technology that would have cost hundreds of thousands' +
        'just ten years ago. And it is now feasible to imagine not just buses like this,' +
        'but classrooms across the country where kids are learning more and more of' +
        'something teachers call "media literacy."' +
        '' +
        '"Media literacy," as Dave Yanofsky, the executive director of Just Think!, puts' +
        'it, "is the ability ... to understand, analyze, and deconstruct media images.' +
        'Its aim is to make [kids] literate about the way media works, the way it\'s' +
        'constructed, the way it\'s delivered, and the way people access it."' +
        '' +
        'This may seem like an odd way to think about "literacy." For most people,' +
        'literacy is about reading and writing. Faulkner and Hemingway and noticing' +
        'split infinitives are the things that "literate" people know about.' +
        '' +
        'Maybe. But in a world where children see on average 390 hours of television' +
        'commercials per year, or between 20,000 and 45,000 commercials generally,[^35]' +
        'it is increasingly important to understand the "grammar" of media. For just as' +
        'there is a grammar for the written word, so, too, is there one for media. And' +
        'just as kids learn how to write by writing lots of terrible prose, kids learn' +
        'how to write media by constructing lots of (at least at first) terrible media.' +
        '' +
        'A growing field of academics and activists sees this form of literacy as' +
        'crucial to the next generation of culture. For though anyone who has written' +
        'understands how difficult writing is - how difficult it is to sequence the' +
        'story, to keep a reader\'s attention, to craft language to be understandable -' +
        'few of us have any real sense of how difficult media is. Or more fundamentally,' +
        'few of us have a sense of how media works, how it holds an audience or leads it' +
        'through a story, how it triggers emotion or builds suspense.' +
        '' +
        'It took filmmaking a generation before it could do these things well. But even' +
        'then, the knowledge was in the filming, not in writing about the film. The' +
        'skill came from experiencing the making of a film, not from reading a book' +
        'about it. One learns to write by writing and then reflecting upon what one has' +
        'written. One learns to write with images by making them and then reflecting' +
        'upon what one has created.' +
        '' +
        'This grammar has changed as media has changed. When it was just film, as' +
        'Elizabeth Daley, executive director of the University of Southern California\'s' +
        'Annenberg Center for Communication and dean of the USC School of Cinema-' +
        'Television, explained to me, the grammar was about "the placement of objects,' +
        'color, ... rhythm, pacing, and texture."[^36] But as computers open up an' +
        'interactive space where a story is "played" as well as experienced, that' +
        'grammar changes. The simple control of narrative is lost, and so other' +
        'techniques are necessary. Author Michael Crichton had mastered the narrative of' +
        'science fiction. But when he tried to design a computer game based on one of' +
        'his works, it was a new craft he had to learn. How to lead people through a' +
        'game without their feeling they have been led was not obvious, even to a wildly' +
        'successful author.[^37]' +
        '' +
        'This skill is precisely the craft a filmmaker learns. As Daley describes,' +
        '"people are very surprised about how they are led through a film. [I]t is' +
        'perfectly constructed to keep you from seeing it, so you have no idea. If a' +
        'filmmaker succeeds you do not know how you were led." If you know you were led' +
        'through a film, the film has failed.' +
        '' +
        'Yet the push for an expanded literacy - one that goes beyond text to include' +
        'audio and visual elements - is not about making better film directors. The aim' +
        'is not to improve the profession of filmmaking at all. Instead, as Daley' +
        'explained,' +
        '' +
        '  From my perspective, probably the most important digital divide is not access' +
        '  to a box. It\'s the ability to be empowered with the language that that box' +
        '  works in. Otherwise only a very few people can write with this language, and' +
        '  all the rest of us are reduced to being read-only.' +
        '' +
        '"Read-only." Passive recipients of culture produced elsewhere. Couch potatoes.' +
        'Consumers. This is the world of media from the twentieth century.' +
        '' +
        'The twenty-first century could be different. This is the crucial point: It' +
        'could be both read and write. Or at least reading and better understanding the' +
        'craft of writing. Or best, reading and understanding the tools that enable the' +
        'writing to lead or mislead. The aim of any literacy, and this literacy in' +
        'particular, is to "empower people to choose the appropriate language for what' +
        'they need to create or express."[^38] It is to enable students "to communicate' +
        'in the language of the twenty-first century."[^39]' +
        '' +
        'As with any language, this language comes more easily to some than to others.' +
        'It doesn\'t necessarily come more easily to those who excel in written language.' +
        'Daley and Stephanie Barish, director of the Institute for Multimedia Literacy' +
        'at the Annenberg Center, describe one particularly poignant example of a' +
        'project they ran in a high school. The high school was a very poor inner-city' +
        'Los Angeles school. In all the traditional measures of success, this school was' +
        'a failure. But Daley and Barish ran a program that gave kids an opportunity to' +
        'use film to express meaning about something the students know something about -' +
        'gun violence.' +
        '' +
        'The class was held on Friday afternoons, and it created a relatively new' +
        'problem for the school. While the challenge in most classes was getting the' +
        'kids to come, the challenge in this class was keeping them away. The "kids were' +
        'showing up at 6 A.M. and leaving at 5 at night," said Barish. They were working' +
        'harder than in any other class to do what education should be about - learning' +
        'how to express themselves.' +
        '' +
        'Using whatever "free web stuff they could find," and relatively simple tools to' +
        'enable the kids to mix "image, sound, and text," Barish said this class' +
        'produced a series of projects that showed something about gun violence that few' +
        'would otherwise understand. This was an issue close to the lives of these' +
        'students. The project "gave them a tool and empowered them to be able to both' +
        'understand it and talk about it," Barish explained. That tool succeeded in' +
        'creating expression - far more successfully and powerfully than could have been' +
        'created using only text. "If you had said to these students, \'you have to do it' +
        'in text,\' they would\'ve just thrown their hands up and gone and done something' +
        'else," Barish described, in part, no doubt, because expressing themselves in' +
        'text is not something these students can do well. Yet neither is text a form in' +
        'which /these/ ideas can be expressed well. The power of this message depended' +
        'upon its connection to this form of expression.' +
        '' +
        '"But isn\'t education about teaching kids to write?" I asked. In part, of' +
        'course, it is. But why are we teaching kids to write? Education, Daley' +
        'explained, is about giving students a way of "constructing meaning." To say' +
        'that that means just writing is like saying teaching writing is only about' +
        'teaching kids how to spell. Text is one part - and increasingly, not the most' +
        'powerful part - of constructing meaning. As Daley explained in the most moving' +
        'part of our interview,' +
        '' +
        '  What you want is to give these students ways of constructing meaning. If all' +
        '  you give them is text, they\'re not going to do it. Because they can\'t. You' +
        '  know, you\'ve got Johnny who can look at a video, he can play a video game, he' +
        '  can do graffiti all over your walls, he can take your car apart, and he can' +
        '  do all sorts of other things. He just can\'t read your text. So Johnny comes' +
        '  to school and you say, "Johnny, you\'re illiterate. Nothing you can do' +
        '  matters." Well, Johnny then has two choices: He can dismiss you or he [can]' +
        '  dismiss himself. If his ego is healthy at all, he\'s going to dismiss you.' +
        '  [But i]nstead, if you say, "Well, with all these things that you can do,' +
        '  let\'s talk about this issue. Play for me music that you think reflects that,' +
        '  or show me images that you think reflect that, or draw for me something that' +
        '  reflects that." Not by giving a kid a video camera and ... saying, "Let\'s go' +
        '  have fun with the video camera and make a little movie." But instead, really' +
        '  help you take these elements that you understand, that are your language, and' +
        '  construct meaning about the topic. ...' +
        '' +
        '  That empowers enormously. And then what happens, of course, is eventually, as' +
        '  it has happened in all these classes, they bump up against the fact, "I need' +
        '  to explain this and I really need to write something." And as one of the' +
        '  teachers told Stephanie, they would rewrite a paragraph 5, 6, 7, 8 times,' +
        '  till they got it right.' +
        '' +
        '  Because they needed to. There was a reason for doing it. They needed to say' +
        '  something, as opposed to just jumping through your hoops. They actually' +
        '  needed to use a language that they didn\'t speak very well. But they had come' +
        '  to understand that they had a lot of power with this language.' +
        '' +
        '*When two planes* crashed into the World Trade Center, another into the' +
        'Pentagon, and a fourth into a Pennsylvania field, all media around the world' +
        'shifted to this news. Every moment of just about every day for that week, and' +
        'for weeks after, television in particular, and media generally, retold the' +
        'story of the events we had just witnessed. The telling was a retelling, because' +
        'we had seen the events that were described. The genius of this awful act of' +
        'terrorism was that the delayed second attack was perfectly timed to assure that' +
        'the whole world would be watching.' +
        '' +
        'These retellings had an increasingly familiar feel. There was music scored for' +
        'the intermissions, and fancy graphics that flashed across the screen. There was' +
        'a formula to interviews. There was "balance," and seriousness. This was news' +
        'choreographed in the way we have increasingly come to expect it, "news as' +
        'entertainment," even if the entertainment is tragedy.' +
        '' +
        'But in addition to this produced news about the "tragedy of September 11,"' +
        'those of us tied to the Internet came to see a very different production as' +
        'well. The Internet was filled with accounts of the same events. Yet these' +
        'Internet accounts had a very different flavor. Some people constructed photo' +
        'pages that captured images from around the world and presented them as slide' +
        'shows with text. Some offered open letters. There were sound recordings. There' +
        'was anger and frustration. There were attempts to provide context. There was,' +
        'in short, an extraordinary worldwide barn raising, in the sense Mike Godwin' +
        'uses the term in his book /Cyber Rights/, around a news event that had captured' +
        'the attention of the world. There was ABC and CBS, but there was also the' +
        'Internet.' +
        '' +
        'I don\'t mean simply to praise the Internet - though I do think the people who' +
        'supported this form of speech should be praised. I mean instead to point to a' +
        'significance in this form of speech. For like a Kodak, the Internet enables' +
        'people to capture images. And like in a movie by a student on the "Just Think!"' +
        'bus, the visual images could be mixed with sound or text.' +
        '' +
        'But unlike any technology for simply capturing images, the Internet allows' +
        'these creations to be shared with an extraordinary number of people,' +
        'practically instantaneously. This is something new in our tradition - not just' +
        'that culture can be captured mechanically, and obviously not just that events' +
        'are commented upon critically, but that this mix of captured images, sound, and' +
        'commentary can be widely spread practically instantaneously.' +
        '' +
        'September 11 was not an aberration. It was a beginning. Around the same time, a' +
        'form of communication that has grown dramatically was just beginning to come' +
        'into public consciousness: the Web-log, or blog. The blog is a kind of public' +
        'diary, and within some cultures, such as in Japan, it functions very much like' +
        'a diary. In those cultures, it records private facts in a public way - it\'s a' +
        'kind of electronic /Jerry Springer/, available anywhere in the world.' +
        '' +
        'But in the United States, blogs have taken on a very different character. There' +
        'are some who use the space simply to talk about their private life. But there' +
        'are many who use the space to engage in public discourse. Discussing matters of' +
        'public import, criticizing others who are mistaken in their views, criticizing' +
        'politicians about the decisions they make, offering solutions to problems we' +
        'all see: blogs create the sense of a virtual public meeting, but one in which' +
        'we don\'t all hope to be there at the same time and in which conversations are' +
        'not necessarily linked. The best of the blog entries are relatively short; they' +
        'point directly to words used by others, criticizing with or adding to them.' +
        'They are arguably the most important form of unchoreographed public discourse' +
        'that we have.' +
        '' +
        'That\'s a strong statement. Yet it says as much about our democracy as it does' +
        'about blogs. This is the part of America that is most difficult for those of us' +
        'who love America to accept: Our democracy has atrophied. Of course we have' +
        'elections, and most of the time the courts allow those elections to count. A' +
        'relatively small number of people vote in those elections. The cycle of these' +
        'elections has become totally professionalized and routinized. Most of us think' +
        'this is democracy.' +
        '' +
        'But democracy has never just been about elections. Democracy means rule by the' +
        'people, but rule means something more than mere elections. In our tradition, it' +
        'also means control through reasoned discourse. This was the idea that captured' +
        'the imagination of Alexis de Tocqueville, the nineteenth-century French lawyer' +
        'who wrote the most important account of early "Democracy in America." It wasn\'t' +
        'popular elections that fascinated him - it was the jury, an institution that' +
        'gave ordinary people the right to choose life or death for other citizens. And' +
        'most fascinating for him was that the jury didn\'t just vote about the outcome' +
        'they would impose. They deliberated. Members argued about the "right" result;' +
        'they tried to persuade each other of the "right" result, and in criminal cases' +
        'at least, they had to agree upon a unanimous result for the process to come to' +
        'an end.[^40]' +
        '' +
        'Yet even this institution flags in American life today. And in its place, there' +
        'is no systematic effort to enable citizen deliberation. Some are pushing to' +
        'create just such an institution.[^41] And in some towns in New England,' +
        'something close to deliberation remains. But for most of us for most of the' +
        'time, there is no time or place for "democratic deliberation" to occur.' +
        '' +
        'More bizarrely, there is generally not even permission for it to occur. We, the' +
        'most powerful democracy in the world, have developed a strong norm against' +
        'talking about politics. It\'s fine to talk about politics with people you agree' +
        'with. But it is rude to argue about politics with people you disagree with.' +
        'Political discourse becomes isolated, and isolated discourse becomes more' +
        'extreme.[^42] We say what our friends want to hear, and hear very little beyond' +
        'what our friends say.' +
        '' +
        'Enter the blog. The blog\'s very architecture solves one part of this problem.' +
        'People post when they want to post, and people read when they want to read. The' +
        'most difficult time is synchronous time. Technologies that enable asynchronous' +
        'communication, such as e-mail, increase the opportunity for communication.' +
        'Blogs allow for public discourse without the public ever needing to gather in a' +
        'single public place.' +
        '' +
        'But beyond architecture, blogs also have solved the problem of norms. There\'s' +
        'no norm (yet) in blog space not to talk about politics. Indeed, the space is' +
        'filled with political speech, on both the right and the left. Some of the most' +
        'popular sites are conservative or libertarian, but there are many of all' +
        'political stripes. And even blogs that are not political cover political issues' +
        'when the occasion merits.' +
        '' +
        'The significance of these blogs is tiny now, though not so tiny. The name' +
        'Howard Dean may well have faded from the 2004 presidential race but for blogs.' +
        'Yet even if the number of readers is small, the reading is having an effect.' +
        '' +
        'One direct effect is on stories that had a different life cycle in the' +
        'mainstream media. The Trent Lott affair is an example. When Lott "misspoke" at' +
        'a party for Senator Strom Thurmond, essentially praising Thurmond\'s' +
        'segregationist policies, he calculated correctly that this story would' +
        'disappear from the mainstream press within forty-eight hours. It did. But he' +
        'didn\'t calculate its life cycle in blog space. The bloggers kept researching' +
        'the story. Over time, more and more instances of the same "misspeaking"' +
        'emerged. Finally, the story broke back into the mainstream press. In the end,' +
        'Lott was forced to resign as senate majority leader.[^43]' +
        '' +
        'This different cycle is possible because the same commercial pressures don\'t' +
        'exist with blogs as with other ventures. Television and newspapers are' +
        'commercial entities. They must work to keep attention. If they lose readers,' +
        'they lose revenue. Like sharks, they must move on.' +
        '' +
        'But bloggers don\'t have a similar constraint. They can obsess, they can focus,' +
        'they can get serious. If a particular blogger writes a particularly interesting' +
        'story, more and more people link to that story. And as the number of links to a' +
        'particular story increases, it rises in the ranks of stories. People read what' +
        'is popular; what is popular has been selected by a very democratic process of' +
        'peer-generated rankings.' +
        '' +
        'There\'s a second way, as well, in which blogs have a different cycle from the' +
        'mainstream press. As Dave Winer, one of the fathers of this movement and a' +
        'software author for many decades, told me, another difference is the absence of' +
        'a financial "conflict of interest." "I think you have to take the conflict of' +
        'interest" out of journalism, Winer told me. "An amateur journalist simply' +
        'doesn\'t have a conflict of interest, or the conflict of interest is so easily' +
        'disclosed that you know you can sort of get it out of the way."' +
        '' +
        'These conflicts become more important as media becomes more concentrated (more' +
        'on this below). A concentrated media can hide more from the public than an' +
        'unconcentrated media can - as CNN admitted it did after the Iraq war because it' +
        'was afraid of the consequences to its own employees.[^44] It also needs to' +
        'sustain a more coherent account. (In the middle of the Iraq war, I read a post' +
        'on the Internet from someone who was at that time listening to a satellite' +
        'uplink with a reporter in Iraq. The New York headquarters was telling the' +
        'reporter over and over that her account of the war was too bleak: She needed to' +
        'offer a more optimistic story. When she told New York that wasn\'t warranted,' +
        'they told her that /they/ were writing "the story.")' +
        '' +
        'Blog space gives amateurs a way to enter the debate - "amateur" not in the' +
        'sense of inexperienced, but in the sense of an Olympic athlete, meaning not' +
        'paid by anyone to give their reports. It allows for a much broader range of' +
        'input into a story, as reporting on the Columbia disaster revealed, when' +
        'hundreds from across the southwest United States turned to the Internet to' +
        'retell what they had seen.[^45] And it drives readers to read across the range' +
        'of accounts and "triangulate," as Winer puts it, the truth. Blogs, Winer says,' +
        'are "communicating directly with our constituency, and the middle man is out of' +
        'it" - with all the benefits, and costs, that might entail.' +
        '' +
        'Winer is optimistic about the future of journalism infected with blogs. "It\'s' +
        'going to become an essential skill," Winer predicts, for public figures and' +
        'increasingly for private figures as well. It\'s not clear that "journalism" is' +
        'happy about this - some journalists have been told to curtail their' +
        'blogging.[^46] But it is clear that we are still in transition. "A lot of what' +
        'we are doing now is warm-up exercises," Winer told me. There is a lot that must' +
        'mature before this space has its mature effect. And as the inclusion of content' +
        'in this space is the least infringing use of the Internet (meaning infringing' +
        'on copyright), Winer said, "we will be the last thing that gets shut down."' +
        '' +
        'This speech affects democracy. Winer thinks that happens because "you don\'t' +
        'have to work for somebody who controls, [for] a gate-keeper." That is true. But' +
        'it affects democracy in another way as well. As more and more citizens express' +
        'what they think, and defend it in writing, that will change the way people' +
        'understand public issues. It is easy to be wrong and misguided in your head. It' +
        'is harder when the product of your mind can be criticized by others. Of course,' +
        'it is a rare human who admits that he has been persuaded that he is wrong. But' +
        'it is even rarer for a human to ignore when he has been proven wrong. The' +
        'writing of ideas, arguments, and criticism improves democracy. Today there are' +
        'probably a couple of million blogs where such writing happens. When there are' +
        'ten million, there will be something extraordinary to report.' +
        '' +
        '*John Seely Brown* is the chief scientist of the Xerox Corporation. His work,' +
        'as his Web site describes it, is "human learning and ... the creation of' +
        'knowledge ecologies for creating ... innovation."' +
        '' +
        'Brown thus looks at these technologies of digital creativity a bit differently' +
        'from the perspectives I\'ve sketched so far. I\'m sure he would be excited about' +
        'any technology that might improve democracy. But his real excitement comes from' +
        'how these technologies affect learning.' +
        '' +
        'As Brown believes, we learn by tinkering. When "a lot of us grew up," he' +
        'explains, that tinkering was done "on motorcycle engines, lawn-mower engines,' +
        'automobiles, radios, and so on." But digital technologies enable a different' +
        'kind of tinkering - with abstract ideas though in concrete form. The kids at' +
        'Just Think! not only think about how a commercial portrays a politician; using' +
        'digital technology, they can take the commercial apart and manipulate it,' +
        'tinker with it to see how it does what it does. Digital technologies launch a' +
        'kind of bricolage, or "free collage," as Brown calls it. Many get to add to or' +
        'transform the tinkering of many others.' +
        '' +
        'The best large-scale example of this kind of tinkering so far is free software' +
        'or open-source software (FS/{OSS). FS}/OSS is software whose source code is' +
        'shared. Anyone can download the technology that makes a FS/OSS program run. And' +
        'anyone eager to learn how a particular bit of FS/OSS technology works can' +
        'tinker with the code.' +
        '' +
        'This opportunity creates a "completely new kind of learning platform," as Brown' +
        'describes. "As soon as you start doing that, you ... unleash a free collage on' +
        'the community, so that other people can start looking at your code, tinkering' +
        'with it, trying it out, seeing if they can improve it." Each effort is a kind' +
        'of apprenticeship. "Open source becomes a major apprenticeship platform."' +
        '' +
        'In this process, "the concrete things you tinker with are abstract. They are' +
        'code." Kids are "shifting to the ability to tinker in the abstract, and this' +
        'tinkering is no longer an isolated activity that you\'re doing in your garage.' +
        'You are tinkering with a community platform. ... You are tinkering with other' +
        'people\'s stuff. The more you tinker the more you improve." The more you' +
        'improve, the more you learn.' +
        '' +
        'This same thing happens with content, too. And it happens in the same' +
        'collaborative way when that content is part of the Web. As Brown puts it, "the' +
        'Web [is] the first medium that truly honors multiple forms of intelligence."' +
        'Earlier technologies, such as the typewriter or word processors, helped amplify' +
        'text. But the Web amplifies much more than text. "The Web ... says if you are' +
        'musical, if you are artistic, if you are visual, if you are interested in film' +
        '... [then] there is a lot you can start to do on this medium. [It] can now' +
        'amplify and honor these multiple forms of intelligence."' +
        '' +
        'Brown is talking about what Elizabeth Daley, Stephanie Barish, and Just Think!' +
        'teach: that this tinkering with culture teaches as well as creates. It develops' +
        'talents differently, and it builds a different kind of recognition.' +
        '' +
        'Yet the freedom to tinker with these objects is not guaranteed. Indeed, as' +
        'we\'ll see through the course of this book, that freedom is increasingly highly' +
        'contested. While there\'s no doubt that your father had the right to tinker with' +
        'the car engine, there\'s great doubt that your child will have the right to' +
        'tinker with the images she finds all around. The law and, increasingly,' +
        'technology interfere with a freedom that technology, and curiosity, would' +
        'otherwise ensure.' +
        '' +
        'These restrictions have become the focus of researchers and scholars. Professor' +
        'Ed Felten of Princeton (whom we\'ll see more of in chapter 10) has developed a' +
        'powerful argument in favor of the "right to tinker" as it applies to computer' +
        'science and to knowledge in general.[^47] But Brown\'s concern is earlier, or' +
        'younger, or more fundamental. It is about the learning that kids can do, or' +
        'can\'t do, because of the law.' +
        '' +
        '"This is where education in the twenty-first century is going," Brown explains.' +
        'We need to "understand how kids who grow up digital think and want to learn."' +
        '' +
        '"Yet," as Brown continued, and as the balance of this book will evince, "we are' +
        'building a legal system that completely suppresses the natural tendencies of' +
        'today\'s digital kids. ... We\'re building an architecture that unleashes 60' +
        'percent of the brain [and] a legal system that closes down that part of the' +
        'brain."' +
        '' +
        'We\'re building a technology that takes the magic of Kodak, mixes moving images' +
        'and sound, and adds a space for commentary and an opportunity to spread that' +
        'creativity everywhere. But we\'re building the law to close down that' +
        'technology.' +
        '' +
        '"No way to run a culture," as Brewster Kahle, whom we\'ll meet in chapter 9,' +
        'quipped to me in a rare moment of despondence.';


    var texts = [ badstein, shakespeare, tristantzara, lessig ];
    var t = Math.floor(Math.random() * 4) + 1;

    console.log('text: ' + t);

    if (texts[t] == '') {
        alert('argh! bad text for #' + t);
    }

    return texts[t];

};

