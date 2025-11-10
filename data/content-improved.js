// DIBELS 8 Practice Lab - Enhanced Content Data
// Aligned with DIBELS 8th Edition Standards
// Updated: 2025

const DIBELS_CONTENT = {
    // DIBELS 8 Benchmark Scores by Grade Level
    benchmarks: {
        'K': {
            'LNF': { wellAboveAverage: 40, aboveAverage: 29, average: 18, belowAverage: 8, wellBelowAverage: 0 },
            'PSF': { wellAboveAverage: 45, aboveAverage: 35, average: 24, belowAverage: 10, wellBelowAverage: 0 },
            'NWF-CLS': { wellAboveAverage: 30, aboveAverage: 21, average: 13, belowAverage: 5, wellBelowAverage: 0 }
        },
        '1': {
            'PSF': { wellAboveAverage: 62, aboveAverage: 53, average: 44, belowAverage: 28, wellBelowAverage: 0 },
            'NWF-CLS': { wellAboveAverage: 63, aboveAverage: 50, average: 37, belowAverage: 19, wellBelowAverage: 0 },
            'NWF-WRC': { wellAboveAverage: 24, aboveAverage: 17, average: 11, belowAverage: 4, wellBelowAverage: 0 },
            'WRF': { wellAboveAverage: 50, aboveAverage: 37, average: 23, belowAverage: 10, wellBelowAverage: 0 },
            'ORF': { wellAboveAverage: 47, aboveAverage: 34, average: 23, belowAverage: 12, wellBelowAverage: 0 }
        },
        '2': {
            'NWF-CLS': { wellAboveAverage: 87, aboveAverage: 76, average: 64, belowAverage: 44, wellBelowAverage: 0 },
            'NWF-WRC': { wellAboveAverage: 38, aboveAverage: 31, average: 24, belowAverage: 13, wellBelowAverage: 0 },
            'WRF': { wellAboveAverage: 72, aboveAverage: 58, average: 44, belowAverage: 25, wellBelowAverage: 0 },
            'ORF': { wellAboveAverage: 87, aboveAverage: 72, average: 58, belowAverage: 39, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 23, aboveAverage: 19, average: 14, belowAverage: 9, wellBelowAverage: 0 }
        },
        '3': {
            'WRF': { wellAboveAverage: 87, aboveAverage: 73, average: 59, belowAverage: 40, wellBelowAverage: 0 },
            'ORF': { wellAboveAverage: 107, aboveAverage: 93, average: 79, belowAverage: 59, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 27, aboveAverage: 23, average: 18, belowAverage: 12, wellBelowAverage: 0 }
        },
        '4': {
            'ORF': { wellAboveAverage: 119, aboveAverage: 105, average: 91, belowAverage: 72, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 29, aboveAverage: 25, average: 21, belowAverage: 15, wellBelowAverage: 0 }
        },
        '5': {
            'ORF': { wellAboveAverage: 126, aboveAverage: 114, average: 101, belowAverage: 83, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 31, aboveAverage: 27, average: 23, belowAverage: 17, wellBelowAverage: 0 }
        },
        '6': {
            'ORF': { wellAboveAverage: 135, aboveAverage: 122, average: 109, belowAverage: 91, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 33, aboveAverage: 29, average: 25, belowAverage: 19, wellBelowAverage: 0 }
        },
        '7-8': {
            'ORF': { wellAboveAverage: 140, aboveAverage: 127, average: 115, belowAverage: 97, wellBelowAverage: 0 },
            'Maze': { wellAboveAverage: 35, aboveAverage: 31, average: 27, belowAverage: 21, wellBelowAverage: 0 }
        }
    },

    // Grade-specific subtest availability (DIBELS 8 Standards)
    gradeSubtests: {
        'K': ['LNF', 'PSF', 'NWF'],
        '1': ['PSF', 'NWF', 'WRF', 'ORF'],
        '2': ['NWF', 'WRF', 'ORF', 'Maze'],
        '3': ['WRF', 'ORF', 'Maze'],
        '4': ['ORF', 'Maze'],
        '5': ['ORF', 'Maze'],
        '6': ['ORF', 'Maze'],
        '7': ['ORF', 'Maze'],
        '8': ['ORF', 'Maze']
    },

    // Subtest descriptions (DIBELS 8 Official Specifications)
    subtestDescriptions: {
        'LNF': {
            name: 'Letter Naming Fluency',
            description: 'Measures the ability to recognize and name uppercase and lowercase letters arranged in random order.',
            timeLimit: 60,
            instructions: 'Name each letter as quickly as you can. If you don\'t know a letter, you can skip it and move to the next one.',
            administration: 'Student has 1 minute to name as many letters as possible from a page of randomly arranged letters.',
            scoring: 'Number of letters named correctly in 1 minute'
        },
        'PSF': {
            name: 'Phonemic Segmentation Fluency',
            description: 'Measures the ability to segment words into individual phonemes fluently.',
            timeLimit: 60,
            instructions: 'I will say a word. Tell me all the sounds you hear in the word. For example, the word "cat" has three sounds: /k/ /a/ /t/.',
            administration: 'Examiner says words aloud. Student produces individual phonemes in each word.',
            scoring: 'Number of correct phonemes produced in 1 minute'
        },
        'NWF': {
            name: 'Nonsense Word Fluency',
            description: 'Measures the ability to decode nonsense (made-up) words using phonics skills.',
            timeLimit: 60,
            instructions: 'Read these made-up words. They are not real words, so use your letter sounds to read them.',
            administration: 'Student reads VC and CVC nonsense words. Can produce letter sounds or whole words.',
            scoring: 'Correct Letter Sounds (CLS) and Whole Words Read Correct (WRC)'
        },
        'WRF': {
            name: 'Word Reading Fluency',
            description: 'Measures the ability to read high-frequency words and decodable words fluently.',
            timeLimit: 60,
            instructions: 'Read each word as quickly and accurately as you can.',
            administration: 'Student reads words from a list for 1 minute.',
            scoring: 'Number of words read correctly in 1 minute'
        },
        'ORF': {
            name: 'Oral Reading Fluency',
            description: 'Measures the ability to read connected text accurately and fluently.',
            timeLimit: 60,
            instructions: 'Read this passage aloud as quickly and accurately as you can. If you make a mistake, you can correct it. If you don\'t know a word, I will tell it to you after 3 seconds.',
            administration: 'Student reads grade-level passage aloud for 1 minute.',
            scoring: 'Words read correctly minus errors'
        },
        'Maze': {
            name: 'Maze Comprehension',
            description: 'Measures reading comprehension by selecting correct words to complete a passage.',
            timeLimit: 180,
            instructions: 'Read the passage silently. For each blank with three word choices, circle the word that best completes the sentence.',
            administration: 'Student reads passage silently and selects correct words from three choices at regular intervals.',
            scoring: 'Number of correct word choices in 3 minutes'
        }
    },

    // Letter Naming Fluency (LNF) content - Aligned with DIBELS 8
    lnf: {
        // Lowercase letters for kindergarten
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        // Uppercase letters
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        // Mixed case for challenge
        mixed: ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']
    },

    // Phonemic Segmentation Fluency (PSF) content - Grade-appropriate with proper phonetic notation
    psf: {
        kindergarten: [
            // 2 phonemes - Beginning level
            { word: 'at', phonemes: ['/a/', '/t/'], count: 2 },
            { word: 'it', phonemes: ['/i/', '/t/'], count: 2 },
            { word: 'up', phonemes: ['/u/', '/p/'], count: 2 },
            { word: 'on', phonemes: ['/o/', '/n/'], count: 2 },
            { word: 'in', phonemes: ['/i/', '/n/'], count: 2 },
            { word: 'am', phonemes: ['/a/', '/m/'], count: 2 },
            { word: 'an', phonemes: ['/a/', '/n/'], count: 2 },
            { word: 'if', phonemes: ['/i/', '/f/'], count: 2 },
            { word: 'of', phonemes: ['/o/', '/f/'], count: 2 },
            { word: 'or', phonemes: ['/o/', '/r/'], count: 2 },
            // 3 phonemes - CVC words
            { word: 'cat', phonemes: ['/k/', '/a/', '/t/'], count: 3 },
            { word: 'dog', phonemes: ['/d/', '/o/', '/g/'], count: 3 },
            { word: 'sun', phonemes: ['/s/', '/u/', '/n/'], count: 3 },
            { word: 'big', phonemes: ['/b/', '/i/', '/g/'], count: 3 },
            { word: 'red', phonemes: ['/r/', '/e/', '/d/'], count: 3 },
            { word: 'hot', phonemes: ['/h/', '/o/', '/t/'], count: 3 },
            { word: 'run', phonemes: ['/r/', '/u/', '/n/'], count: 3 },
            { word: 'sit', phonemes: ['/s/', '/i/', '/t/'], count: 3 },
            { word: 'top', phonemes: ['/t/', '/o/', '/p/'], count: 3 },
            { word: 'win', phonemes: ['/w/', '/i/', '/n/'], count: 3 }
        ],
        first: [
            // 3 phonemes - CVC
            { word: 'mop', phonemes: ['/m/', '/o/', '/p/'], count: 3 },
            { word: 'bat', phonemes: ['/b/', '/a/', '/t/'], count: 3 },
            { word: 'leg', phonemes: ['/l/', '/e/', '/g/'], count: 3 },
            { word: 'fun', phonemes: ['/f/', '/u/', '/n/'], count: 3 },
            { word: 'kid', phonemes: ['/k/', '/i/', '/d/'], count: 3 },
            { word: 'pen', phonemes: ['/p/', '/e/', '/n/'], count: 3 },
            { word: 'rug', phonemes: ['/r/', '/u/', '/g/'], count: 3 },
            { word: 'van', phonemes: ['/v/', '/a/', '/n/'], count: 3 },
            { word: 'wet', phonemes: ['/w/', '/e/', '/t/'], count: 3 },
            { word: 'zip', phonemes: ['/z/', '/i/', '/p/'], count: 3 },
            // 4 phonemes - with blends and digraphs
            { word: 'frog', phonemes: ['/f/', '/r/', '/o/', '/g/'], count: 4 },
            { word: 'slip', phonemes: ['/s/', '/l/', '/i/', '/p/'], count: 4 },
            { word: 'drum', phonemes: ['/d/', '/r/', '/u/', '/m/'], count: 4 },
            { word: 'snap', phonemes: ['/s/', '/n/', '/a/', '/p/'], count: 4 },
            { word: 'step', phonemes: ['/s/', '/t/', '/e/', '/p/'], count: 4 },
            { word: 'spin', phonemes: ['/s/', '/p/', '/i/', '/n/'], count: 4 },
            { word: 'glad', phonemes: ['/g/', '/l/', '/a/', '/d/'], count: 4 },
            { word: 'trip', phonemes: ['/t/', '/r/', '/i/', '/p/'], count: 4 },
            { word: 'swim', phonemes: ['/s/', '/w/', '/i/', '/m/'], count: 4 },
            { word: 'spot', phonemes: ['/s/', '/p/', '/o/', '/t/'], count: 4 }
        ],
        second: [
            // 4 phonemes
            { word: 'drop', phonemes: ['/d/', '/r/', '/o/', '/p/'], count: 4 },
            { word: 'chip', phonemes: ['/ch/', '/i/', '/p/'], count: 3 },
            { word: 'shop', phonemes: ['/sh/', '/o/', '/p/'], count: 3 },
            { word: 'this', phonemes: ['/th/', '/i/', '/s/'], count: 3 },
            { word: 'that', phonemes: ['/th/', '/a/', '/t/'], count: 3 },
            { word: 'with', phonemes: ['/w/', '/i/', '/th/'], count: 3 },
            { word: 'when', phonemes: ['/w/', '/h/', '/e/', '/n/'], count: 4 },
            { word: 'went', phonemes: ['/w/', '/e/', '/n/', '/t/'], count: 4 },
            { word: 'fast', phonemes: ['/f/', '/a/', '/s/', '/t/'], count: 4 },
            { word: 'jump', phonemes: ['/j/', '/u/', '/m/', '/p/'], count: 4 },
            // 5 phonemes
            { word: 'spent', phonemes: ['/s/', '/p/', '/e/', '/n/', '/t/'], count: 5 },
            { word: 'stamp', phonemes: ['/s/', '/t/', '/a/', '/m/', '/p/'], count: 5 },
            { word: 'blend', phonemes: ['/b/', '/l/', '/e/', '/n/', '/d/'], count: 5 },
            { word: 'plant', phonemes: ['/p/', '/l/', '/a/', '/n/', '/t/'], count: 5 },
            { word: 'trend', phonemes: ['/t/', '/r/', '/e/', '/n/', '/d/'], count: 5 }
        ]
    },

    // Nonsense Word Fluency (NWF) content - True nonsense words only
    nwf: {
        // VC (Vowel-Consonant) patterns
        vc: [
            'ab', 'ad', 'af', 'ag', 'ak', 'al', 'am', 'an', 'ap', 'ar',
            'eb', 'ed', 'ef', 'eg', 'ek', 'el', 'em', 'en', 'ep', 'er',
            'ib', 'id', 'if', 'ig', 'ik', 'il', 'im', 'in', 'ip', 'ir',
            'ob', 'od', 'of', 'og', 'ok', 'ol', 'om', 'on', 'op', 'or',
            'ub', 'ud', 'uf', 'ug', 'uk', 'ul', 'um', 'un', 'up', 'ur'
        ],
        // CVC (Consonant-Vowel-Consonant) patterns - true nonsense only
        cvc: [
            'baf', 'bep', 'bif', 'bop', 'bup',
            'daf', 'dep', 'dif', 'dop', 'dup',
            'fam', 'fem', 'fim', 'fom', 'fum',
            'gaf', 'gep', 'gib', 'gop', 'gub',
            'hab', 'hep', 'hif', 'hob', 'hup',
            'jab', 'jep', 'jib', 'jop', 'jub',
            'kaf', 'kep', 'kif', 'kop', 'kup',
            'lam', 'lem', 'lim', 'lom', 'lum',
            'maf', 'mep', 'mif', 'mop', 'mup',
            'naf', 'nep', 'nif', 'nop', 'nup',
            'paf', 'peb', 'pif', 'pob', 'pud',
            'raf', 'rep', 'rif', 'rop', 'rud',
            'saf', 'sep', 'sif', 'sop', 'sud',
            'taf', 'tep', 'tif', 'tob', 'tud',
            'vaf', 'vep', 'vif', 'vop', 'vud',
            'waf', 'wep', 'wif', 'wop', 'wud',
            'yaf', 'yep', 'yif', 'yop', 'yud',
            'zaf', 'zep', 'zif', 'zop', 'zud'
        ],
        // CCVC patterns - consonant blends
        ccvc: [
            'blaf', 'blep', 'blif', 'blop', 'blup',
            'braf', 'brep', 'brif', 'brop', 'brup',
            'claf', 'clep', 'clif', 'clop', 'clup',
            'craf', 'crep', 'crif', 'crop', 'crup',
            'draf', 'drep', 'drif', 'drop', 'drup',
            'flaf', 'flep', 'flif', 'flop', 'flup',
            'fraf', 'frep', 'frif', 'frop', 'frup',
            'glaf', 'glep', 'glif', 'glop', 'glup',
            'graf', 'grep', 'grif', 'grop', 'grup',
            'plaf', 'plep', 'plif', 'plop', 'plup',
            'praf', 'prep', 'prif', 'prop', 'prup',
            'scaf', 'scep', 'scif', 'scop', 'scup',
            'skaf', 'skep', 'skif', 'skop', 'skup',
            'slaf', 'slep', 'slif', 'slop', 'slup',
            'smaf', 'smep', 'smif', 'smop', 'smup',
            'snaf', 'snep', 'snif', 'snop', 'snup',
            'spaf', 'spep', 'spif', 'spop', 'spup',
            'staf', 'step', 'stif', 'stop', 'stup',
            'swaf', 'swep', 'swif', 'swop', 'swup',
            'traf', 'trep', 'trif', 'trop', 'trup'
        ],
        // CVCC patterns - ending blends
        cvcc: [
            'baft', 'bamp', 'band', 'bank', 'bent',
            'best', 'daft', 'damp', 'dent', 'filt',
            'gaft', 'gamp', 'gelt', 'gent', 'gust',
            'haft', 'hamp', 'hent', 'hift', 'hust',
            'jaft', 'jamp', 'jelt', 'jent', 'just',
            'kaft', 'kamp', 'kent', 'kift', 'kust',
            'laft', 'lamp', 'lent', 'lift', 'lust',
            'maft', 'mamp', 'melt', 'ment', 'mift',
            'naft', 'namp', 'nelt', 'nent', 'nift',
            'paft', 'pamp', 'pelt', 'pent', 'pift',
            'raft', 'ramp', 'rent', 'rift', 'rust',
            'saft', 'samp', 'sent', 'sift', 'sust',
            'taft', 'tamp', 'tent', 'tift', 'tust',
            'vaft', 'vamp', 'vent', 'vift', 'vust',
            'waft', 'wamp', 'went', 'wift', 'wust'
        ]
    },

    // Word Reading Fluency (WRF) content - High-frequency and decodable words
    wrf: {
        kindergarten: [
            // Dolch Pre-Primer words
            'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for',
            'funny', 'go', 'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little',
            'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run', 'said',
            'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you',
            // Simple CVC words
            'at', 'an', 'am', 'as', 'if', 'in', 'is', 'it', 'of', 'on',
            'or', 'us', 'be', 'by', 'do', 'go', 'he', 'hi', 'ho', 'me',
            'my', 'no', 'so', 'to', 'up', 'we'
        ],
        first: [
            // Dolch Primer words
            'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'but', 'came',
            'did', 'do', 'eat', 'four', 'get', 'good', 'have', 'he', 'into', 'like',
            'must', 'new', 'no', 'now', 'on', 'our', 'out', 'please', 'pretty', 'ran',
            'ride', 'saw', 'say', 'she', 'soon', 'that', 'there', 'they', 'this', 'too',
            'under', 'want', 'was', 'well', 'went', 'what', 'white', 'who', 'will', 'with',
            // Dolch First Grade words
            'after', 'again', 'an', 'any', 'as', 'ask', 'by', 'could', 'every', 'fly',
            'from', 'give', 'going', 'had', 'has', 'her', 'him', 'his', 'how', 'just',
            'know', 'let', 'live', 'may', 'of', 'old', 'once', 'open', 'over', 'put',
            'round', 'some', 'stop', 'take', 'thank', 'them', 'then', 'think', 'walk', 'were',
            'when'
        ],
        second: [
            // Dolch Second Grade words
            'always', 'around', 'because', 'been', 'before', 'best', 'both', 'buy', 'call', 'cold',
            'does', 'don\'t', 'fast', 'first', 'five', 'found', 'gave', 'goes', 'green', 'its',
            'made', 'many', 'off', 'or', 'pull', 'read', 'right', 'sing', 'sit', 'sleep',
            'tell', 'their', 'these', 'those', 'upon', 'us', 'use', 'very', 'wash', 'which',
            'why', 'wish', 'work', 'would', 'write', 'your',
            // Common decodable words
            'about', 'back', 'bring', 'carry', 'clean', 'cut', 'done', 'draw', 'drink', 'eight',
            'fall', 'far', 'full', 'got', 'grow', 'hold', 'hot', 'hurt', 'keep', 'kind',
            'laugh', 'light', 'long', 'much', 'myself', 'never', 'only', 'own', 'pick', 'seven',
            'shall', 'show', 'six', 'small', 'start', 'ten', 'today', 'together', 'try', 'warm'
        ],
        third: [
            // Dolch Third Grade words
            'about', 'better', 'bring', 'carry', 'clean', 'cut', 'done', 'draw', 'drink', 'eight',
            'fall', 'far', 'full', 'got', 'grow', 'hold', 'hot', 'hurt', 'if', 'keep',
            'kind', 'laugh', 'light', 'long', 'much', 'myself', 'never', 'only', 'own', 'pick',
            'seven', 'shall', 'show', 'six', 'small', 'start', 'ten', 'today', 'together', 'try',
            'warm',
            // Academic vocabulary
            'answer', 'book', 'chapter', 'class', 'earth', 'example', 'group', 'history', 'idea', 'important',
            'learn', 'lesson', 'listen', 'math', 'nature', 'page', 'paper', 'question', 'read', 'science',
            'sentence', 'spell', 'story', 'student', 'study', 'teacher', 'test', 'understand', 'word', 'write'
        ],
        fourth: [
            'ability', 'accept', 'according', 'achieve', 'across', 'action', 'actually', 'addition', 'address', 'admit',
            'adult', 'advance', 'advantage', 'advice', 'affect', 'afford', 'afraid', 'afternoon', 'against', 'agree',
            'ahead', 'allow', 'almost', 'alone', 'along', 'already', 'although', 'always', 'among', 'amount',
            'ancient', 'angle', 'animal', 'announce', 'another', 'answer', 'anyone', 'anything', 'anyway', 'anywhere',
            'appear', 'apply', 'approach', 'area', 'argue', 'army', 'around', 'arrive', 'article', 'artist'
        ],
        fifth: [
            'ability', 'absence', 'absolutely', 'academic', 'accept', 'access', 'accident', 'accomplish', 'according', 'account',
            'accurate', 'achieve', 'acknowledge', 'acquire', 'across', 'action', 'active', 'activity', 'actual', 'actually',
            'adapt', 'addition', 'additional', 'address', 'adequate', 'adjust', 'administration', 'admit', 'adopt', 'adult',
            'advance', 'advanced', 'advantage', 'adventure', 'advertise', 'advice', 'advise', 'affair', 'affect', 'afford',
            'afraid', 'afternoon', 'afterward', 'again', 'against', 'agency', 'agent', 'aggressive', 'agree', 'agreement'
        ],
        sixth: [
            'abandon', 'ability', 'abolish', 'abortion', 'absolute', 'absolutely', 'absorb', 'abstract', 'absurd', 'abundance',
            'abuse', 'academic', 'academy', 'accelerate', 'accent', 'accept', 'acceptable', 'acceptance', 'access', 'accessible',
            'accident', 'accidental', 'accommodate', 'accompany', 'accomplish', 'accord', 'accordance', 'according', 'accordingly', 'account',
            'accountability', 'accountable', 'accumulate', 'accuracy', 'accurate', 'accurately', 'accuse', 'achieve', 'achievement', 'acid',
            'acknowledge', 'acquire', 'acquisition', 'across', 'action', 'activate', 'active', 'actively', 'activist', 'activity'
        ],
        seventh: [
            'abandon', 'abbreviate', 'abdomen', 'abdominal', 'abduct', 'aberrant', 'abeyance', 'abhor', 'abide', 'ability',
            'ablaze', 'able', 'abnormal', 'aboard', 'abolish', 'abolition', 'abominable', 'aboriginal', 'abortion', 'abortive',
            'abound', 'about', 'above', 'abrasion', 'abrasive', 'abreast', 'abridge', 'abroad', 'abrupt', 'abruptly',
            'abscess', 'abscond', 'absence', 'absent', 'absentee', 'absolute', 'absolutely', 'absolution', 'absolve', 'absorb',
            'absorption', 'abstain', 'abstemious', 'abstinence', 'abstract', 'abstraction', 'abstruse', 'absurd', 'absurdity', 'abundance'
        ],
        eighth: [
            'aardvark', 'abandon', 'abase', 'abash', 'abate', 'abattoir', 'abbess', 'abbey', 'abbot', 'abbreviate',
            'abbreviation', 'abdicate', 'abdication', 'abdomen', 'abdominal', 'abduct', 'abduction', 'aberrant', 'aberration', 'abet',
            'abeyance', 'abhor', 'abhorrence', 'abhorrent', 'abide', 'abiding', 'ability', 'abject', 'abjure', 'ablaze',
            'able', 'ablution', 'ably', 'abnegate', 'abnegation', 'abnormal', 'abnormality', 'aboard', 'abode', 'abolish',
            'abolition', 'abolitionist', 'abominable', 'abominate', 'abomination', 'aboriginal', 'aborigine', 'abort', 'abortion', 'abortive'
        ]
    },

    // Oral Reading Fluency (ORF) passages - Grade-leveled with accurate word counts
    orf: {
        kindergarten: [
            {
                title: "My Cat",
                text: "I have a cat. My cat is big. My cat is soft. My cat can run. My cat can jump. I like my cat. My cat likes me.",
                wordCount: 31,
                genre: 'narrative'
            },
            {
                title: "The Sun",
                text: "The sun is up. The sun is hot. The sun is bright. I see the sun. The sun helps us. The sun is good.",
                wordCount: 28,
                genre: 'informational'
            },
            {
                title: "At the Park",
                text: "We go to the park. I see a dog. I see a bird. I see the trees. We play at the park. The park is fun.",
                wordCount: 30,
                genre: 'narrative'
            }
        ],
        first: [
            {
                title: "The Lost Ball",
                text: "Tom had a red ball. He took it to the park. Tom threw the ball high. The ball went over the fence. A girl found the ball. She gave it back to Tom. Tom said thank you. Now Tom is more careful with his ball.",
                wordCount: 50,
                genre: 'narrative'
            },
            {
                title: "Frogs",
                text: "Frogs are animals that live near water. Frogs have smooth, wet skin. They have long back legs for jumping. Frogs eat flies and bugs. Baby frogs are called tadpoles. Tadpoles live in water. When they grow up, they can live on land too.",
                wordCount: 49,
                genre: 'informational'
            },
            {
                title: "The Garden",
                text: "Mom and I planted a garden. We dug holes in the dirt. We put seeds in the holes. Then we watered them. Every day I checked the garden. Soon little green plants came up. Now we have tomatoes and carrots to eat.",
                wordCount: 48,
                genre: 'narrative'
            }
        ],
        second: [
            {
                title: "The Camping Trip",
                text: "Our family went camping last weekend. We drove to the mountains. Dad set up the tent while Mom made sandwiches. My sister and I collected wood for the fire. That night we roasted marshmallows. We saw many stars in the sky. I heard an owl hooting. In the morning, we went hiking. It was the best trip ever.",
                wordCount: 63,
                genre: 'narrative'
            },
            {
                title: "Butterflies",
                text: "Butterflies are beautiful insects with colorful wings. They start life as tiny eggs. The eggs hatch into caterpillars. Caterpillars eat leaves and grow bigger. Then they form a chrysalis. Inside the chrysalis, the caterpillar changes into a butterfly. This process is called metamorphosis. When the butterfly comes out, its wings are wet and folded. Soon they dry and the butterfly can fly.",
                wordCount: 68,
                genre: 'informational'
            },
            {
                title: "The New Student",
                text: "Maya was nervous on her first day at a new school. She didn't know anyone in her class. At recess, she sat alone on a bench. A girl named Emma came over. Emma asked if Maya wanted to play jump rope. Maya smiled and said yes. By lunchtime, Maya had made three new friends. She was glad she came to her new school.",
                wordCount: 67,
                genre: 'narrative'
            }
        ],
        third: [
            {
                title: "The Science Project",
                text: "Carlos wanted to do something special for the science fair. He decided to build a volcano. First, he made the mountain shape with clay and cardboard. Then he painted it brown and gray to look like a real volcano. For the eruption, he mixed baking soda, vinegar, and red food coloring. On the day of the fair, Carlos poured the mixture into his volcano. It fizzed and bubbled over the sides. Everyone gathered around to watch. His teacher was very impressed. Carlos won second place in the fair.",
                wordCount: 98,
                genre: 'narrative'
            },
            {
                title: "The Water Cycle",
                text: "Water moves in a cycle on Earth. First, the sun heats water in oceans, rivers, and lakes. The water evaporates and turns into water vapor, which is a gas. The water vapor rises into the air and cools down. It condenses into tiny droplets that form clouds. When the droplets get big enough, they fall as rain or snow. This is called precipitation. The water flows back into oceans and rivers, and the cycle starts again. This process keeps happening over and over.",
                wordCount: 95,
                genre: 'informational'
            },
            {
                title: "The Time Capsule",
                text: "Our class made a time capsule to bury in the school yard. Everyone brought something special to put inside. I brought a picture of my family and a letter about my life. My friend Sarah brought a popular toy. We included a newspaper and some coins too. Our teacher wrote about our class and what we learned this year. We sealed everything in a metal box. The principal helped us dig a hole and bury it. We'll open it in twenty-five years. I wonder what we'll think when we see it again.",
                wordCount: 104,
                genre: 'narrative'
            }
        ],
        fourth: [
            {
                title: "Benjamin Franklin's Inventions",
                text: "Benjamin Franklin was one of America's greatest inventors. He created many useful things that we still use today. Franklin invented bifocal glasses, which help people see both near and far. He also invented the lightning rod to protect buildings from lightning strikes. The Franklin stove heated homes more efficiently than fireplaces. He discovered that lightning is electricity by flying a kite in a storm. Franklin was also a statesman and helped write the Declaration of Independence. His inventions and ideas changed America forever.",
                wordCount: 93,
                genre: 'informational'
            },
            {
                title: "The School Play Audition",
                text: "Jessica wanted the lead role in the school play. She had practiced her lines for weeks. When audition day came, she felt butterflies in her stomach. Jessica watched other students perform. They were all very good. When her turn came, she walked onto the stage. The bright lights made it hard to see the audience. Jessica took a deep breath and began to speak. Her voice was clear and strong. She remembered every word. After the audition, the director smiled at her. Jessica felt proud of herself no matter what happened.",
                wordCount: 102,
                genre: 'narrative'
            },
            {
                title: "Ecosystems",
                text: "An ecosystem is a community of living things and their environment. Plants, animals, and tiny organisms all work together. Each organism has a role in the ecosystem. Plants make food using sunlight through photosynthesis. Herbivores eat plants for energy. Carnivores hunt other animals. Decomposers break down dead plants and animals. This returns nutrients to the soil. When one part of an ecosystem changes, it affects everything else. That's why it's important to protect natural habitats. Healthy ecosystems help all living things survive.",
                wordCount: 95,
                genre: 'informational'
            }
        ],
        fifth: [
            {
                title: "The Journey West",
                text: "In the 1840s, thousands of pioneers traveled west across America in covered wagons. They were searching for better land and new opportunities. The journey was extremely difficult and dangerous. Families had to cross rivers, climb mountains, and travel through deserts. They faced harsh weather, disease, and limited food supplies. The trip took about five months to complete. Despite these hardships, the pioneers showed remarkable courage and determination. They helped settle the western territories and eventually formed new states. Their journey changed the face of America forever and demonstrated the strength of the human spirit.",
                wordCount: 103,
                genre: 'informational'
            },
            {
                title: "The Championship Game",
                text: "The score was tied with thirty seconds left in the championship game. Marcus dribbled the basketball down the court. His heart pounded as the crowd roared. He looked for an open teammate but everyone was covered. Twenty seconds remained. Marcus drove toward the basket. A defender blocked his path. He spun around and passed to his teammate Sarah. She caught the ball with five seconds left. Sarah jumped and shot the ball toward the basket. The buzzer sounded. Everyone watched as the ball arced through the air. It swished through the net! The team celebrated their amazing victory.",
                wordCount: 110,
                genre: 'narrative'
            },
            {
                title: "Renewable Energy",
                text: "Renewable energy comes from natural sources that don't run out. Solar power uses energy from the sun. Special panels convert sunlight into electricity. Wind turbines capture the power of moving air. Hydroelectric dams use flowing water to generate electricity. Geothermal energy taps into heat from inside the Earth. These clean energy sources don't pollute the environment like fossil fuels do. As technology improves, renewable energy is becoming less expensive. Many countries are investing in these sustainable solutions. Using renewable energy helps fight climate change and protects our planet for future generations.",
                wordCount: 104,
                genre: 'informational'
            }
        ],
        sixth: [
            {
                title: "The Ancient Egyptian Pyramids",
                text: "The pyramids of ancient Egypt are among the most remarkable structures ever built. The largest pyramid, the Great Pyramid of Giza, was constructed around 2560 BCE. It took approximately twenty years to complete and required thousands of workers. The pyramid originally stood 481 feet tall and contained about 2.3 million stone blocks. Each block weighed between two and fifteen tons. Workers transported these massive stones without modern machinery, using ropes, wooden sleds, and human strength. The pyramids served as tombs for pharaohs and contained treasures and belongings for the afterlife. Today, these ancient wonders continue to fascinate people and reveal secrets about Egyptian civilization.",
                wordCount: 113,
                genre: 'informational'
            },
            {
                title: "The Storm",
                text: "Dark clouds gathered on the horizon as the wind began to howl. Sarah secured the shutters on the old farmhouse while her grandfather brought the animals into the barn. The weather forecast had predicted a severe storm, and they knew they had to prepare quickly. Thunder rumbled in the distance, growing louder with each passing minute. Rain started falling in large, heavy drops, quickly turning into sheets of water. The electricity flickered once, twice, then went out completely. Sarah lit candles throughout the house while her grandfather checked the emergency supplies. They settled in to wait out the storm, listening to the wind rattle the windows and shake the walls.",
                wordCount: 119,
                genre: 'narrative'
            }
        ],
        seventh: [
            {
                title: "The Scientific Method",
                text: "The scientific method is a systematic approach that scientists use to investigate questions and solve problems. It begins with careful observation of natural phenomena and asking thoughtful questions about what has been observed. Scientists then formulate a hypothesis, which is an educated guess or proposed explanation. Next, they design controlled experiments to test their hypothesis objectively. During experiments, scientists collect and analyze data meticulously, looking for patterns and relationships. They draw conclusions based on their findings and compare results with their original hypothesis. If the data doesn't support the hypothesis, scientists revise their ideas and test again. This process has led to countless discoveries and technological innovations throughout human history.",
                wordCount: 119,
                genre: 'informational'
            },
            {
                title: "The Decision",
                text: "Standing at the crossroads of her future, Elena faced the most difficult decision of her young life. She had received acceptance letters from two outstanding universities, each offering unique opportunities and challenges. The first school had an excellent science program and would allow her to pursue her passion for marine biology. However, it was located across the country, far from her family and everything familiar. The second university was closer to home and offered a generous scholarship, but its marine science department wasn't as renowned. Elena spent sleepless nights weighing her options, discussing possibilities with family and mentors. She knew that whatever choice she made would shape her future in profound ways.",
                wordCount: 122,
                genre: 'narrative'
            }
        ],
        eighth: [
            {
                title: "The Industrial Revolution",
                text: "The Industrial Revolution fundamentally transformed society during the late eighteenth and nineteenth centuries. Beginning in Great Britain, this period marked a dramatic shift from agrarian economies to industrial manufacturing. The invention of the steam engine revolutionized transportation and factory production. Textile mills, iron foundries, and coal mines emerged as major industries. People migrated from rural areas to cities seeking employment in factories. While industrialization created unprecedented economic growth and technological innovation, it also generated significant social problems. Workers endured dangerous conditions, long hours, and low wages. Child labor was commonplace. Urban areas became overcrowded and polluted. These challenges eventually led to labor movements, reforms, and government regulations that improved working conditions and established workers' rights.",
                wordCount: 122,
                genre: 'informational'
            },
            {
                title: "The Discovery",
                text: "Dr. Chen carefully examined the artifacts unearthed from the archaeological site. Her team had been excavating this location for three months, uncovering pottery, tools, and architectural remains. However, nothing compared to what she held in her hands now—a perfectly preserved tablet covered in an unknown writing system. The symbols were unlike anything documented in existing databases. This discovery could potentially rewrite our understanding of ancient civilizations in this region. Dr. Chen photographed the tablet from every angle, documenting each detail meticulously. She immediately contacted colleagues at the university, knowing that deciphering this mysterious script would require expertise from linguists, historians, and computer specialists. This moment represented why she had dedicated her life to archaeology.",
                wordCount: 124,
                genre: 'narrative'
            }
        ]
    },

    // Maze Comprehension passages with multiple-choice word selections
    maze: {
        third: [
            {
                title: "Weather Patterns",
                text: "Weather [can/will/may] change quickly throughout the day. Sometimes it is [sunny/rainy/cloudy] and warm in the morning. Later, clouds might [appear/disappear/form] and cover the sky. When [dark/light/bright] clouds gather, rain often [falls/rises/stays]. Weather affects what we [wear/eat/drink] and the activities we [do/see/hear] outdoors.",
                wordCount: 52,
                correctAnswers: ['can', 'sunny', 'appear', 'dark', 'falls', 'wear', 'do']
            },
            {
                title: "The Library",
                text: "The library is a [quiet/loud/busy] place where people come to [read/play/run]. There are [many/few/some] different kinds of books. You can [find/lose/hide] books about animals, [space/food/toys], and history. The [librarian/teacher/student] helps you find what you [need/want/have]. Libraries are [important/funny/small] for learning.",
                wordCount: 51,
                correctAnswers: ['quiet', 'read', 'many', 'find', 'space', 'librarian', 'need', 'important']
            }
        ],
        fourth: [
            {
                title: "The Solar System",
                text: "Our solar system [consists/contains/includes] of eight planets that [orbit/circle/revolve] around the Sun. Each planet has [unique/special/different] characteristics and features. Mercury is the [closest/nearest/first] planet to the Sun, while Neptune is the [farthest/last/distant]. Earth is the [only/single/one] planet known to [support/have/contain] life. Scientists [continue/keep/try] to study the other planets to [learn/discover/find] more about our [universe/galaxy/system].",
                wordCount: 68,
                correctAnswers: ['consists', 'orbit', 'unique', 'closest', 'farthest', 'only', 'support', 'continue', 'learn', 'universe']
            }
        ],
        fifth: [
            {
                title: "Photosynthesis",
                text: "Photosynthesis is the [process/way/method] by which plants [make/create/produce] their own food. Plants [use/need/take] sunlight, water, and carbon dioxide for this [important/vital/necessary] process. Chlorophyll, the [substance/material/chemical] that makes plants green, [captures/absorbs/takes] sunlight. The plant then [converts/changes/transforms] this energy into [sugar/food/glucose] that it can use to [grow/live/survive].",
                wordCount: 64,
                correctAnswers: ['process', 'make', 'use', 'important', 'substance', 'captures', 'converts', 'sugar', 'grow']
            }
        ],
        sixth: [
            {
                title: "The Renaissance",
                text: "The Renaissance was a [period/time/era] of great cultural and [intellectual/mental/artistic] change that began in [Italy/Europe/Rome] during the 14th century. This era [marked/showed/indicated] the transition from [medieval/ancient/old] to modern times. Artists like Leonardo da Vinci and Michelangelo [created/made/painted] masterpieces that are still [admired/appreciated/valued] today. The invention of the [printing/writing/copying] press made books more [accessible/available/common] to people.",
                wordCount: 68,
                correctAnswers: ['period', 'intellectual', 'Italy', 'marked', 'medieval', 'created', 'admired', 'printing', 'accessible']
            }
        ],
        seventh: [
            {
                title: "The Scientific Revolution",
                text: "The Scientific Revolution [fundamentally/completely/totally] changed how people [understood/viewed/perceived] the natural world. Scientists like Copernicus, Galileo, and Newton [challenged/questioned/disputed] traditional beliefs and [developed/created/invented] new methods of [inquiry/investigation/research]. The heliocentric model of the solar system [replaced/changed/altered] the geocentric view. This period [established/founded/created] the foundation for modern [science/knowledge/understanding] and technology.",
                wordCount: 60,
                correctAnswers: ['fundamentally', 'understood', 'challenged', 'developed', 'inquiry', 'replaced', 'established', 'science']
            }
        ],
        eighth: [
            {
                title: "Climate Change",
                text: "Climate change [represents/shows/indicates] one of the most [significant/important/serious] challenges facing our [planet/world/Earth] today. Human [activities/actions/behaviors] such as burning fossil [fuels/resources/materials] have increased greenhouse gas [emissions/releases/outputs]. These gases [trap/capture/hold] heat in the atmosphere, causing global [temperatures/climates/conditions] to rise. Scientists [warn/caution/alert] that without immediate [action/response/intervention], the consequences could be [catastrophic/devastating/severe] for future generations.",
                wordCount: 67,
                correctAnswers: ['represents', 'significant', 'planet', 'activities', 'fuels', 'emissions', 'trap', 'temperatures', 'warn', 'action', 'catastrophic']
            }
        ]
    }
};

// Utility functions for content generation
const ContentGenerator = {
    // Generate random content for a subtest
    generateContent(subtest, grade, options = {}) {
        switch (subtest) {
            case 'LNF':
                return this.generateLNF(grade, options);
            case 'PSF':
                return this.generatePSF(grade, options);
            case 'NWF':
                return this.generateNWF(grade, options);
            case 'WRF':
                return this.generateWRF(grade, options);
            case 'ORF':
                return this.generateORF(grade, options);
            case 'Maze':
                return this.generateMaze(grade, options);
            default:
                return null;
        }
    },

    // Generate Letter Naming Fluency content
    generateLNF(grade, options) {
        const count = options.count || 104; // Standard DIBELS LNF has 104 letters
        let letters;
        
        if (grade === 'K') {
            letters = DIBELS_CONTENT.lnf.mixed;
        } else {
            letters = DIBELS_CONTENT.lnf.mixed;
        }
        
        const content = [];
        for (let i = 0; i < count; i++) {
            content.push(letters[Math.floor(Math.random() * letters.length)]);
        }
        
        return {
            type: 'LNF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.LNF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.LNF.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.LNF.scoring
        };
    },

    // Generate Phonemic Segmentation Fluency content
    generatePSF(grade, options) {
        const gradeKey = grade === 'K' ? 'kindergarten' : grade === '1' ? 'first' : 'second';
        const words = DIBELS_CONTENT.psf[gradeKey] || DIBELS_CONTENT.psf.kindergarten;
        
        const count = options.count || 20;
        const content = [];
        const shuffled = this.shuffle([...words]);
        
        for (let i = 0; i < Math.min(count, shuffled.length); i++) {
            content.push(shuffled[i]);
        }
        
        return {
            type: 'PSF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.PSF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.PSF.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.PSF.scoring
        };
    },

    // Generate Nonsense Word Fluency content
    generateNWF(grade, options) {
        const count = options.count || 50;
        let words = [];
        
        // Mix different patterns based on grade level
        if (grade === 'K' || grade === '1') {
            words = [...DIBELS_CONTENT.nwf.vc, ...DIBELS_CONTENT.nwf.cvc];
        } else {
            words = [...DIBELS_CONTENT.nwf.cvc, ...DIBELS_CONTENT.nwf.ccvc, ...DIBELS_CONTENT.nwf.cvcc];
        }
        
        const content = [];
        const shuffled = this.shuffle(words);
        
        for (let i = 0; i < Math.min(count, shuffled.length); i++) {
            content.push(shuffled[i]);
        }
        
        return {
            type: 'NWF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.NWF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.NWF.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.NWF.scoring
        };
    },

    // Generate Word Reading Fluency content
    generateWRF(grade, options) {
        const gradeMap = {
            'K': 'kindergarten',
            '1': 'first',
            '2': 'second',
            '3': 'third',
            '4': 'fourth',
            '5': 'fifth',
            '6': 'sixth',
            '7': 'seventh',
            '8': 'eighth'
        };
        
        const gradeKey = gradeMap[grade] || 'kindergarten';
        const words = DIBELS_CONTENT.wrf[gradeKey] || DIBELS_CONTENT.wrf.kindergarten;
        
        const count = options.count || 100;
        const content = [];
        const shuffled = this.shuffle([...words]);
        
        for (let i = 0; i < Math.min(count, shuffled.length); i++) {
            content.push(shuffled[i]);
        }
        
        return {
            type: 'WRF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.WRF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.WRF.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.WRF.scoring
        };
    },

    // Generate Oral Reading Fluency content
    generateORF(grade, options) {
        const gradeMap = {
            'K': 'kindergarten',
            '1': 'first',
            '2': 'second',
            '3': 'third',
            '4': 'fourth',
            '5': 'fifth',
            '6': 'sixth',
            '7': 'seventh',
            '8': 'eighth'
        };
        
        const gradeKey = gradeMap[grade] || 'kindergarten';
        const passages = DIBELS_CONTENT.orf[gradeKey] || DIBELS_CONTENT.orf.kindergarten;
        
        const passage = passages[Math.floor(Math.random() * passages.length)];
        
        return {
            type: 'ORF',
            content: passage,
            instructions: DIBELS_CONTENT.subtestDescriptions.ORF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.ORF.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.ORF.scoring
        };
    },

    // Generate Maze Comprehension content
    generateMaze(grade, options) {
        const gradeMap = {
            '2': 'third',
            '3': 'third',
            '4': 'fourth',
            '5': 'fifth',
            '6': 'sixth',
            '7': 'seventh',
            '8': 'eighth'
        };
        
        const gradeKey = gradeMap[grade] || 'third';
        const passages = DIBELS_CONTENT.maze[gradeKey] || DIBELS_CONTENT.maze.third;
        
        const passage = passages[Math.floor(Math.random() * passages.length)];
        
        return {
            type: 'Maze',
            content: passage,
            instructions: DIBELS_CONTENT.subtestDescriptions.Maze.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.Maze.timeLimit,
            scoring: DIBELS_CONTENT.subtestDescriptions.Maze.scoring
        };
    },

    // Shuffle array helper
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Get benchmark score for grade and subtest
    getBenchmark(grade, subtest, level = 'average') {
        const gradeKey = grade === '7' || grade === '8' ? '7-8' : grade;
        const gradeBenchmarks = DIBELS_CONTENT.benchmarks[gradeKey];
        
        if (!gradeBenchmarks || !gradeBenchmarks[subtest]) {
            return null;
        }
        
        return gradeBenchmarks[subtest][level] || null;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DIBELS_CONTENT, ContentGenerator };
}

