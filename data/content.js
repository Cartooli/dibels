// DIBELS Practice Lab - Content Data
// This file contains all the practice content for DIBELS 8 subtests

const DIBELS_CONTENT = {
    // Grade-specific subtest availability
    gradeSubtests: {
        'K': ['LNF', 'PSF', 'NWF'],
        '1': ['LNF', 'PSF', 'NWF', 'WRF'],
        '2': ['LNF', 'PSF', 'NWF', 'WRF', 'ORF'],
        '3': ['LNF', 'WRF', 'ORF', 'Maze'],
        '4': ['WRF', 'ORF', 'Maze'],
        '5': ['WRF', 'ORF', 'Maze'],
        '6': ['WRF', 'ORF', 'Maze'],
        '7': ['WRF', 'ORF', 'Maze'],
        '8': ['WRF', 'ORF', 'Maze']
    },

    // Subtest descriptions
    subtestDescriptions: {
        'LNF': {
            name: 'Letter Naming Fluency',
            description: 'Identify letters of the alphabet quickly and accurately',
            timeLimit: 60,
            instructions: 'Name each letter as quickly as you can. If you don\'t know a letter, say "skip" and move to the next one.'
        },
        'PSF': {
            name: 'Phonemic Segmentation Fluency',
            description: 'Break words into individual sounds (phonemes)',
            timeLimit: 60,
            instructions: 'I\'ll say a word. You break it into sounds. For example, "cat" has three sounds: /k/ /a/ /t/.'
        },
        'NWF': {
            name: 'Nonsense Word Fluency',
            description: 'Read made-up words using phonics skills',
            timeLimit: 60,
            instructions: 'Read each word as quickly as you can. These are made-up words, so use your phonics skills.'
        },
        'WRF': {
            name: 'Word Reading Fluency',
            description: 'Read real words quickly and accurately',
            timeLimit: 60,
            instructions: 'Read each word as quickly and accurately as you can.'
        },
        'ORF': {
            name: 'Oral Reading Fluency',
            description: 'Read connected text aloud with accuracy and speed',
            timeLimit: 60,
            instructions: 'Read this passage aloud as quickly and accurately as you can. If you make a mistake, correct it and keep going.'
        },
        'Maze': {
            name: 'Maze Comprehension',
            description: 'Choose correct words to complete sentences',
            timeLimit: 60,
            instructions: 'Read the passage and choose the correct word for each blank. Circle your answer.'
        }
    },

    // Letter Naming Fluency (LNF) content
    lnf: {
        // Mixed case letters for different difficulty levels
        easy: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        medium: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        hard: ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']
    },

    // Phonemic Segmentation Fluency (PSF) content
    psf: {
        // Grade-specific word lists with systematic progression
        kindergarten: [
            // 2 phonemes
            'at', 'it', 'up', 'on', 'in', 'an', 'am', 'is', 'as', 'us',
            'be', 'me', 'we', 'he', 'go', 'no', 'so', 'to', 'do', 'my',
            // 3 phonemes - CVC
            'cat', 'bat', 'hat', 'mat', 'rat', 'sat', 'pat', 'fat', 'vat',
            'dog', 'log', 'fog', 'bog', 'hog', 'jog', 'cog', 'frog',
            'sun', 'fun', 'run', 'bun', 'gun', 'pun', 'nun'
        ],
        first: [
            // 3 phonemes - CVC
            'cat', 'bat', 'hat', 'mat', 'rat', 'sat', 'pat', 'fat', 'vat', 'that',
            'dog', 'log', 'fog', 'bog', 'hog', 'jog', 'cog', 'frog', 'smog', 'clog',
            'sun', 'fun', 'run', 'bun', 'gun', 'pun', 'nun', 'spun', 'stun', 'shun',
            'bed', 'red', 'led', 'fed', 'wed', 'leg', 'peg', 'beg', 'hem', 'gem',
            'bit', 'fit', 'hit', 'kit', 'lit', 'pit', 'sit', 'wit', 'bog', 'cog',
            // 4 phonemes - blends
            'stop', 'drop', 'shop', 'chop', 'flop', 'crop', 'prop', 'swap', 'wrap',
            'truck', 'stuck', 'chuck', 'pluck', 'cluck', 'duck', 'luck', 'muck', 'tuck', 'suck',
            'frog', 'smog', 'clog', 'blog', 'flog', 'slog', 'snog', 'trog'
        ],
        second: [
            // 4 phonemes - blends and digraphs
            'stop', 'drop', 'shop', 'chop', 'flop', 'crop', 'prop', 'trop', 'swap', 'wrap',
            'truck', 'stuck', 'chuck', 'pluck', 'cluck', 'duck', 'luck', 'muck', 'tuck', 'suck',
            'frog', 'smog', 'clog', 'blog', 'flog', 'slog', 'snog', 'trog',
            'brush', 'crush', 'flush', 'blush', 'slush', 'trush', 'splash', 'crash', 'flash', 'smash',
            'trash', 'clash', 'slash', 'mash', 'dash', 'bash', 'wash', 'cash', 'hash', 'rash',
            // 5 phonemes
            'splash', 'crash', 'flash', 'smash', 'trash', 'clash', 'slash', 'mash', 'dash', 'bash',
            'spring', 'string', 'bring', 'cling', 'fling', 'sling', 'wing', 'ring', 'sing', 'thing'
        ],
        third: [
            // 4-5 phonemes - complex blends
            'splash', 'crash', 'flash', 'smash', 'trash', 'clash', 'slash', 'mash', 'dash', 'bash',
            'spring', 'string', 'bring', 'cling', 'fling', 'sling', 'wing', 'ring', 'sing', 'thing',
            'strong', 'wrong', 'prong', 'throng', 'belong', 'prolong', 'along', 'among', 'young',
            'blend', 'spend', 'trend', 'bend', 'lend', 'mend', 'send', 'tend', 'vend', 'wend',
            'brand', 'grand', 'stand', 'hand', 'land', 'sand', 'band', 'wand', 'command', 'demand',
            // 6 phonemes - multisyllabic
            'splinter', 'printer', 'winter', 'hunter', 'counter', 'pointer', 'painter', 'center',
            'monster', 'cluster', 'master', 'faster', 'laster', 'caster', 'blaster', 'plaster'
        ],
        fourth: [
            // 4-5 phonemes - appropriate for grade level
            'splinter', 'printer', 'winter', 'hunter', 'counter', 'pointer', 'painter', 'center',
            'monster', 'cluster', 'master', 'faster', 'laster', 'caster', 'blaster', 'plaster',
            'splendid', 'fantastic', 'dramatic', 'automatic', 'systematic', 'diplomatic',
            'electric', 'magnetic', 'energetic', 'athletic', 'creative', 'active', 'positive',
            'beautiful', 'wonderful', 'colorful', 'powerful', 'peaceful', 'graceful', 'grateful',
            'comfortable', 'portable', 'notable', 'suitable', 'valuable', 'reliable', 'available'
        ],
        fifth: [
            // 6+ phonemes - complex multisyllabic
            'splendid', 'tremendous', 'fantastic', 'dramatic', 'automatic', 'systematic', 'diplomatic',
            'electric', 'magnetic', 'energetic', 'athletic', 'pathetic', 'synthetic', 'aesthetic',
            'beautiful', 'wonderful', 'colorful', 'powerful', 'peaceful', 'graceful', 'grateful',
            'comfortable', 'portable', 'notable', 'suitable', 'valuable', 'reliable', 'available',
            'extraordinary', 'revolutionary', 'evolutionary', 'constitutional', 'institutional',
            'educational', 'operational', 'organizational', 'conversational', 'inspirational',
            'imagination', 'determination', 'concentration', 'cooperation', 'administration'
        ],
        sixth: [
            // 6+ phonemes - academic vocabulary
            'extraordinary', 'revolutionary', 'evolutionary', 'constitutional', 'institutional',
            'educational', 'operational', 'organizational', 'conversational', 'inspirational',
            'imagination', 'determination', 'concentration', 'cooperation', 'administration',
            'transformation', 'information', 'confirmation', 'explanation', 'examination',
            'civilization', 'organization', 'realization', 'specialization', 'visualization',
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization'
        ],
        seventh: [
            // 7+ phonemes - advanced academic vocabulary
            'transformation', 'information', 'confirmation', 'explanation', 'examination',
            'civilization', 'organization', 'realization', 'specialization', 'visualization',
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization',
            'revolutionary', 'evolutionary', 'constitutional', 'institutional', 'educational',
            'operational', 'organizational', 'conversational', 'inspirational', 'motivational',
            'international', 'multinational', 'intercontinental', 'transcontinental', 'transnational'
        ],
        eighth: [
            // 7+ phonemes - complex academic vocabulary
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization',
            'revolutionary', 'evolutionary', 'constitutional', 'institutional', 'educational',
            'operational', 'organizational', 'conversational', 'inspirational', 'motivational',
            'international', 'multinational', 'intercontinental', 'transcontinental', 'transnational',
            'interdisciplinary', 'multidisciplinary', 'transdisciplinary', 'intergenerational',
            'multigenerational', 'transgenerational', 'interpersonal', 'multipersonal', 'transpersonal'
        ]
    },

    // Nonsense Word Fluency (NWF) content
    nwf: {
        // CV (Consonant-Vowel) patterns
        cv: [
            'ba', 'be', 'bi', 'bo', 'bu', 'ca', 'ce', 'ci', 'co', 'cu',
            'da', 'de', 'di', 'do', 'du', 'fa', 'fe', 'fi', 'fo', 'fu',
            'ga', 'ge', 'gi', 'go', 'gu', 'ha', 'he', 'hi', 'ho', 'hu',
            'ja', 'je', 'ji', 'jo', 'ju', 'ka', 'ke', 'ki', 'ko', 'ku',
            'la', 'le', 'li', 'lo', 'lu', 'ma', 'me', 'mi', 'mo', 'mu'
        ],
        // VC (Vowel-Consonant) patterns
        vc: [
            'ab', 'ad', 'ag', 'am', 'an', 'ap', 'at', 'ax', 'eb', 'ed',
            'eg', 'em', 'en', 'ep', 'et', 'ex', 'ib', 'id', 'ig', 'im',
            'in', 'ip', 'it', 'ix', 'ob', 'od', 'og', 'om', 'on', 'op',
            'ot', 'ox', 'ub', 'ud', 'ug', 'um', 'un', 'up', 'ut', 'ux'
        ],
        // CVC (Consonant-Vowel-Consonant) patterns
        cvc: [
            'bat', 'cat', 'fat', 'hat', 'mat', 'pat', 'rat', 'sat', 'vat', 'nat',
            'bed', 'fed', 'led', 'red', 'wed', 'beg', 'leg', 'peg', 'hem', 'gem',
            'bit', 'fit', 'hit', 'kit', 'lit', 'pit', 'sit', 'wit', 'bog', 'cog',
            'dog', 'fog', 'hog', 'jog', 'log', 'mug', 'bug', 'hug', 'jug', 'rug'
        ],
        // CCVC patterns
        ccvc: [
            'blab', 'crab', 'drab', 'grab', 'scab', 'stab', 'trab', 'clad', 'glad', 'sad',
            'bled', 'fled', 'sled', 'bred', 'cred', 'fled', 'gled', 'pled', 'sled', 'tled',
            'blip', 'clip', 'drip', 'flip', 'grip', 'skip', 'slip', 'trip', 'whip', 'zip'
        ],
        // CVCC patterns
        cvcc: [
            'back', 'hack', 'jack', 'lack', 'pack', 'rack', 'sack', 'tack', 'wack', 'yack',
            'bend', 'fend', 'lend', 'mend', 'rend', 'send', 'tend', 'vend', 'wend', 'zend',
            'bump', 'dump', 'hump', 'jump', 'lump', 'pump', 'rump', 'sump', 'tump', 'wump'
        ]
    },

    // Word Reading Fluency (WRF) content
    wrf: {
        // Grade-specific word lists with systematic phonics progression
        kindergarten: [
            // High frequency words
            'a', 'and', 'are', 'as', 'at', 'be', 'for', 'from', 'have', 'he',
            'his', 'I', 'in', 'is', 'it', 'of', 'on', 'that', 'the', 'to',
            'was', 'with', 'you', 'all', 'an', 'by', 'do', 'go', 'if', 'me',
            'my', 'no', 'so', 'up', 'we', 'am', 'can', 'had', 'has', 'her',
            // CVC words
            'cat', 'bat', 'hat', 'mat', 'rat', 'sat', 'pat', 'fat', 'vat',
            'dog', 'log', 'fog', 'bog', 'hog', 'jog', 'cog', 'frog',
            'sun', 'fun', 'run', 'bun', 'gun', 'pun', 'nun',
            'bed', 'red', 'led', 'fed', 'wed', 'leg', 'peg', 'beg',
            'bit', 'fit', 'hit', 'kit', 'lit', 'pit', 'sit', 'wit'
        ],
        first: [
            // High frequency words
            'about', 'after', 'again', 'any', 'ask', 'back', 'been', 'before', 'big', 'but',
            'came', 'come', 'could', 'day', 'did', 'does', 'down', 'each', 'first', 'get',
            'give', 'good', 'has', 'her', 'him', 'how', 'into', 'just', 'know', 'like',
            'little', 'long', 'made', 'make', 'many', 'may', 'more', 'most', 'new', 'now',
            'old', 'only', 'other', 'our', 'out', 'over', 'put', 'right', 'said', 'see',
            // CVC words with blends
            'stop', 'drop', 'shop', 'chop', 'flop', 'crop', 'prop', 'swap', 'wrap',
            'truck', 'stuck', 'chuck', 'pluck', 'cluck', 'duck', 'luck', 'muck', 'tuck', 'suck',
            'brush', 'crush', 'flush', 'blush', 'slush', 'trush',
            // Digraphs
            'ship', 'shop', 'shut', 'shot', 'shin', 'chin', 'chip', 'chop', 'chat', 'chum',
            'thin', 'think', 'thank', 'thing', 'thick', 'that', 'this', 'then', 'them', 'they',
            'when', 'what', 'where', 'why', 'which', 'while', 'white', 'who', 'whom', 'whose'
        ],
        second: [
            // High frequency words
            'also', 'another', 'around', 'away', 'because', 'before', 'being', 'both', 'call', 'came',
            'come', 'could', 'did', 'does', 'down', 'each', 'even', 'every', 'find', 'first',
            'found', 'from', 'gave', 'get', 'give', 'going', 'good', 'great', 'had', 'has',
            'have', 'help', 'here', 'him', 'his', 'how', 'into', 'just', 'know', 'like',
            'little', 'long', 'look', 'made', 'make', 'many', 'may', 'more', 'most', 'much',
            // Complex blends and digraphs
            'splash', 'crash', 'flash', 'smash', 'trash', 'clash', 'slash', 'mash', 'dash', 'bash',
            'spring', 'string', 'bring', 'cling', 'fling', 'sling', 'wing', 'ring', 'sing', 'thing',
            'strong', 'wrong', 'prong', 'throng', 'belong', 'prolong', 'along', 'among', 'young',
            // Common prefixes
            'unhappy', 'unfair', 'unable', 'unlock', 'unfold', 'unpack', 'unload', 'unlock',
            'redo', 'remake', 'retell', 'return', 'replay', 'rewrite', 'rebuild', 'renew',
            'preview', 'prepare', 'pretend', 'prevent', 'preschool', 'preheat', 'prepay', 'preplan'
        ],
        third: [
            // High frequency words
            'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'along', 'already',
            'also', 'although', 'always', 'among', 'another', 'answer', 'any', 'anyone', 'anything', 'anywhere',
            'around', 'ask', 'away', 'back', 'because', 'before', 'behind', 'being', 'below', 'between',
            'both', 'bring', 'build', 'call', 'came', 'carry', 'change', 'children', 'close', 'come',
            'could', 'country', 'course', 'cut', 'different', 'does', 'done', 'down', 'during', 'each',
            // Multisyllabic words
            'splinter', 'printer', 'winter', 'hunter', 'counter', 'pointer', 'painter', 'center',
            'monster', 'cluster', 'master', 'faster', 'laster', 'caster', 'blaster', 'plaster',
            'splendid', 'tremendous', 'fantastic', 'dramatic', 'automatic', 'systematic',
            // Academic vocabulary
            'animal', 'plant', 'water', 'earth', 'space', 'science', 'nature', 'weather', 'season',
            'mountain', 'ocean', 'forest', 'desert', 'island', 'valley', 'river', 'lake', 'pond'
        ],
        fourth: [
            // High frequency words
            'above', 'across', 'against', 'almost', 'along', 'already', 'although', 'always', 'among', 'another',
            'answer', 'anyone', 'anything', 'anywhere', 'around', 'away', 'because', 'before', 'behind', 'being',
            'below', 'between', 'both', 'bring', 'build', 'called', 'came', 'carry', 'change', 'children',
            'close', 'come', 'could', 'country', 'course', 'cut', 'different', 'does', 'done', 'down',
            'during', 'each', 'early', 'earth', 'enough', 'even', 'every', 'example', 'family', 'father',
            // Grade-appropriate academic vocabulary
            'electric', 'magnetic', 'energetic', 'athletic', 'creative', 'active', 'positive',
            'beautiful', 'wonderful', 'colorful', 'powerful', 'peaceful', 'graceful', 'grateful',
            'comfortable', 'portable', 'notable', 'suitable', 'valuable', 'reliable', 'available',
            // Science vocabulary
            'experiment', 'hypothesis', 'observation', 'conclusion', 'evidence', 'research', 'discovery',
            'invention', 'technology', 'materials', 'substance', 'mixture', 'solution', 'reaction'
        ],
        fifth: [
            // High frequency words
            'above', 'across', 'against', 'almost', 'along', 'already', 'although', 'always', 'among', 'another',
            'answer', 'anyone', 'anything', 'anywhere', 'around', 'away', 'because', 'before', 'behind', 'being',
            'below', 'between', 'both', 'bring', 'build', 'called', 'came', 'carry', 'change', 'children',
            'close', 'come', 'could', 'country', 'course', 'cut', 'different', 'does', 'done', 'down',
            'during', 'each', 'early', 'earth', 'enough', 'even', 'every', 'example', 'family', 'father',
            // Grade-appropriate academic vocabulary
            'extraordinary', 'remarkable', 'incredible', 'amazing', 'fantastic',
            'educational', 'instructional', 'informational', 'conversational', 'inspirational',
            'imagination', 'determination', 'concentration', 'cooperation', 'organization',
            // Social studies vocabulary
            'government', 'democracy', 'community', 'citizen', 'election', 'voting',
            'representative', 'mayor', 'governor', 'president', 'leader', 'official'
        ],
        sixth: [
            // High frequency words
            'ability', 'accept', 'according', 'account', 'across', 'action', 'activity', 'actually', 'address', 'administration',
            'admit', 'adult', 'affect', 'after', 'again', 'against', 'agent', 'agree', 'ahead', 'allow',
            'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'amount', 'analysis',
            'another', 'answer', 'anyone', 'anything', 'anywhere', 'appear', 'approach', 'area', 'around', 'arrive',
            'article', 'artist', 'assume', 'attack', 'attempt', 'attention', 'attitude', 'attorney', 'audience', 'author',
            // Grade-appropriate academic vocabulary
            'transformation', 'information', 'confirmation', 'explanation', 'examination',
            'civilization', 'organization', 'realization', 'specialization', 'visualization',
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization',
            // Math vocabulary
            'algebra', 'geometry', 'statistics', 'probability', 'percentage', 'fraction', 'decimal',
            'equation', 'variable', 'coefficient', 'exponent', 'quadratic', 'polynomial'
        ],
        seventh: [
            // High frequency words
            'ability', 'accept', 'according', 'account', 'across', 'action', 'activity', 'actually', 'address', 'administration',
            'admit', 'adult', 'affect', 'after', 'again', 'against', 'agent', 'agree', 'ahead', 'allow',
            'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'amount', 'analysis',
            'another', 'answer', 'anyone', 'anything', 'anywhere', 'appear', 'approach', 'area', 'around', 'arrive',
            'article', 'artist', 'assume', 'attack', 'attempt', 'attention', 'attitude', 'attorney', 'audience', 'author',
            // Grade-appropriate academic vocabulary
            'transformation', 'information', 'confirmation', 'explanation', 'examination',
            'civilization', 'organization', 'realization', 'specialization', 'visualization',
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization',
            'revolutionary', 'evolutionary', 'educational', 'instructional', 'informational',
            'operational', 'organizational', 'conversational', 'inspirational', 'motivational',
            // Literature vocabulary
            'metaphor', 'simile', 'personification', 'alliteration', 'hyperbole', 'irony', 'symbolism',
            'protagonist', 'antagonist', 'narrator', 'dialogue', 'monologue', 'character', 'setting'
        ],
        eighth: [
            // High frequency words
            'ability', 'accept', 'according', 'account', 'across', 'action', 'activity', 'actually', 'address', 'administration',
            'admit', 'adult', 'affect', 'after', 'again', 'against', 'agent', 'agree', 'ahead', 'allow',
            'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'amount', 'analysis',
            'another', 'answer', 'anyone', 'anything', 'anywhere', 'appear', 'approach', 'area', 'around', 'arrive',
            'article', 'artist', 'assume', 'attack', 'attempt', 'attention', 'attitude', 'attorney', 'audience', 'author',
            // Grade-appropriate academic vocabulary
            'characterization', 'modernization', 'standardization', 'optimization', 'utilization',
            'revolutionary', 'evolutionary', 'educational', 'instructional', 'informational',
            'operational', 'organizational', 'conversational', 'inspirational', 'motivational',
            'international', 'multinational', 'intercontinental', 'transcontinental', 'transnational',
            'interdisciplinary', 'multidisciplinary', 'transdisciplinary', 'intergenerational',
            'multigenerational', 'transgenerational', 'interpersonal', 'multipersonal', 'transpersonal',
            // Science vocabulary
            'photosynthesis', 'mitochondria', 'chloroplast', 'ecosystem', 'biodiversity', 'sustainability',
            'democracy', 'community', 'citizenship', 'leadership', 'responsibility', 'cooperation'
        ]
    },

    // Oral Reading Fluency (ORF) passages
    orf: {
        // Grade-appropriate reading passages
        kindergarten: [
            {
                title: "The Cat",
                text: "The cat is big. The cat is red. The cat can run. The cat can jump. I like the cat. The cat likes me. We play together. The cat is my friend.",
                wordCount: 35
            },
            {
                title: "My Dog",
                text: "I have a dog. His name is Max. Max is brown. Max is big. Max likes to play. Max likes to run. Max likes to eat. I love Max. Max loves me.",
                wordCount: 33
            },
            {
                title: "The Sun",
                text: "The sun is bright. The sun is hot. The sun is yellow. The sun is up high. I see the sun. The sun makes me warm. I like sunny days. The sun is good.",
                wordCount: 32
            },
            {
                title: "My Family",
                text: "I have a family. My mom is nice. My dad is tall. My sister is little. We all live together. We eat dinner together. I love my family. They love me too.",
                wordCount: 34
            },
            {
                title: "The Ball",
                text: "I have a ball. The ball is round. The ball is red. I can throw the ball. I can catch the ball. I can kick the ball. The ball is fun to play with.",
                wordCount: 33
            }
        ],
        first: [
            {
                title: "The Little Bird",
                text: "A little bird sat on a tree. The bird was small and brown. It sang a sweet song. The bird looked at me. I looked at the bird. The bird flew away. I was sad to see it go.",
                wordCount: 42
            },
            {
                title: "My Family",
                text: "I have a big family. There is my mom and dad. There is my sister and brother. We all live together. We eat dinner together. We play games together. I love my family very much.",
                wordCount: 38
            },
            {
                title: "The Rain",
                text: "It started to rain today. The rain came down fast. I put on my raincoat. I put on my boots. I went outside to play. I jumped in the puddles. The rain was fun.",
                wordCount: 39
            },
            {
                title: "My Pet Fish",
                text: "I have a pet fish. His name is Bubbles. Bubbles is orange and white. He lives in a fish tank. I feed him every day. He swims around and around. I like to watch him swim.",
                wordCount: 40
            },
            {
                title: "The Park",
                text: "We went to the park today. The park has a big slide. It has swings too. I went down the slide. I swung on the swings. I played with my friends. The park was lots of fun.",
                wordCount: 41
            }
        ],
        second: [
            {
                title: "The Magic Garden",
                text: "In the corner of our yard, there was a small garden. My grandmother planted flowers there every spring. The flowers were bright and colorful. Butterflies came to visit the garden. I loved to sit and watch them fly from flower to flower.",
                wordCount: 52
            },
            {
                title: "The Lost Puppy",
                text: "One day, I found a puppy in the park. The puppy was small and scared. It was hiding under a bench. I called my mom to help. We took the puppy to the animal shelter. The people there were very kind and helped the puppy find a home.",
                wordCount: 54
            },
            {
                title: "The School Play",
                text: "Our class put on a school play last week. I was a tree in the play. My friend was a bird. We practiced for many days. On the day of the play, I was nervous. But I remembered all my lines. Everyone clapped when it was over.",
                wordCount: 55
            },
            {
                title: "The New Bike",
                text: "I got a new bike for my birthday. It is red and shiny. It has training wheels. I practiced riding it every day. At first, I fell down a lot. But I kept trying. Now I can ride without training wheels.",
                wordCount: 48
            },
            {
                title: "The Library Visit",
                text: "We went to the library yesterday. The library has thousands of books. I found a book about dinosaurs. I also found a book about space. The librarian helped me check out the books. I can't wait to read them at home.",
                wordCount: 45
            }
        ],
        third: [
            {
                title: "The Rainy Day Adventure",
                text: "It was raining hard outside, but Sarah didn't mind. She put on her yellow raincoat and red boots. She grabbed her umbrella and went outside to play. The rain made puddles everywhere. Sarah jumped in every puddle she could find. Her mother watched from the window and smiled.",
                wordCount: 60
            },
            {
                title: "The Library Visit",
                text: "Every Saturday, Tom and his father went to the library. Tom loved to read books about space and planets. His father liked mystery books. They would sit quietly and read for hours. Sometimes, Tom would check out books to take home. The librarian was always happy to help them find new stories.",
                wordCount: 58
            },
            {
                title: "The Science Experiment",
                text: "Our class did a science experiment today. We mixed vinegar and baking soda together. The mixture started to bubble and fizz. It made a lot of foam. We learned that when you mix an acid and a base, it creates a chemical reaction. Science is so much fun when you can see it happen.",
                wordCount: 59
            },
            {
                title: "The Field Trip",
                text: "We went on a field trip to the zoo yesterday. We saw lions, tigers, and bears. The elephants were huge and gray. The monkeys were swinging from tree to tree. My favorite animal was the penguin. They were swimming in the water and sliding on the ice. I want to go back to the zoo again.",
                wordCount: 61
            },
            {
                title: "The Art Project",
                text: "We made clay sculptures in art class today. I decided to make a bowl for my mom. I rolled the clay into a ball first. Then I pressed my thumb into the center to make a hole. I smoothed the edges with my fingers. When it dries, I will paint it blue. I hope my mom likes it.",
                wordCount: 58
            }
        ],
        fourth: [
            {
                title: "The Science Fair",
                text: "Maria was excited about the science fair. She had been working on her project for weeks. Her experiment was about growing plants in different types of soil. She carefully measured the growth of each plant every day. Maria wrote down all her observations in a notebook. On the day of the fair, she set up her display and explained her project to the judges.",
                wordCount: 65
            },
            {
                title: "The Camping Trip",
                text: "Last summer, my family went camping in the mountains. We packed our tent, sleeping bags, and food. The drive took three hours to reach the campground. When we arrived, we set up our tent near a beautiful lake. We spent our days hiking, fishing, and swimming. At night, we sat around the campfire and told stories. It was the best vacation we ever had.",
                wordCount: 70
            },
            {
                title: "The School Election",
                text: "Our school held an election for class president last week. Three students ran for the position. Each candidate gave a speech about their ideas. They talked about improving the playground and adding more books to the library. The students voted by secret ballot. The winner was announced at the end of the day. Everyone cheered for the new class president.",
                wordCount: 68
            },
            {
                title: "The Weather Station",
                text: "Our class built a weather station in the school garden. We installed a thermometer to measure temperature. We put up a wind vane to see which way the wind blows. We also have a rain gauge to measure how much it rains. Every morning, we check our instruments and record the data. We are learning about weather patterns and climate.",
                wordCount: 66
            },
            {
                title: "The Community Garden",
                text: "Our neighborhood started a community garden last spring. Families can rent small plots to grow their own vegetables. My family planted tomatoes, carrots, and lettuce. We water our plants every day and pull out the weeds. It's amazing to watch the vegetables grow from tiny seeds. We share our harvest with our neighbors and learn about healthy eating.",
                wordCount: 67
            }
        ],
        fifth: [
            {
                title: "The Ancient Discovery",
                text: "Archaeologists working in Egypt made an amazing discovery last month. They found a hidden chamber in an ancient pyramid that had been sealed for over 3,000 years. Inside the chamber, they discovered beautiful paintings, gold jewelry, and ancient scrolls. The scrolls contained writing that no one had seen before. Scientists from around the world are studying these artifacts to learn more about ancient Egyptian culture and history.",
                wordCount: 75
            },
            {
                title: "The Space Mission",
                text: "The Mars rover Perseverance has been exploring the red planet for over two years. It has collected rock samples and taken thousands of photographs. Scientists hope to learn if there was ever life on Mars. The rover has found evidence of ancient water on the planet. This discovery has excited researchers around the world. Future missions will bring these samples back to Earth for detailed study.",
                wordCount: 72
            },
            {
                title: "The Environmental Project",
                text: "Our school started an environmental project to reduce waste and promote recycling. Students organized a recycling program for paper, plastic, and aluminum cans. We also planted native trees around the school to improve air quality. The project has been so successful that other schools in our district want to copy our program. We are proud to be making a positive impact on our environment.",
                wordCount: 69
            },
            {
                title: "The Technology Fair",
                text: "The annual technology fair showcased amazing inventions created by students. One student designed a robot that could sort recyclable materials. Another created an app that helps people find local farmers markets. The judges were impressed by the creativity and practical applications of the projects. The fair inspired many students to pursue careers in science and technology.",
                wordCount: 71
            },
            {
                title: "The Historical Research",
                text: "Our class conducted research about the history of our town. We visited the local museum and interviewed elderly residents. We discovered that our town was founded by immigrants who came to work in the textile mills. We learned about the challenges they faced and how they built a strong community. Our research will be displayed in the town hall for everyone to see.",
                wordCount: 68
            }
        ],
        sixth: [
            {
                title: "The School Science Fair",
                text: "Our school held its annual science fair last week. Students from all grades presented their projects in the gymnasium. There were experiments about plants, animals, and weather. Some students built volcanoes that actually erupted. Others created simple machines that could lift heavy objects. The judges were impressed by the creativity and effort shown by all participants.",
                wordCount: 68
            },
            {
                title: "The School Library",
                text: "Our school library is a wonderful place filled with thousands of books. Students can find books about adventure, mystery, science, and history. The librarian helps students choose books that match their reading level and interests. There are comfortable chairs and tables where students can read quietly. The library also has computers for research and homework projects.",
                wordCount: 71
            },
            {
                title: "The School Garden",
                text: "Our school has a beautiful garden where students learn about growing plants. Each class has its own section to plant vegetables and flowers. Students water the plants every day and watch them grow. The garden teaches us about nature and where our food comes from. In the fall, we harvest the vegetables and share them with our families.",
                wordCount: 69
            },
            {
                title: "The School Play",
                text: "Our class is putting on a school play about friendship and teamwork. We have been practicing our lines and learning our songs for several weeks. The play tells the story of students who work together to solve a problem. Everyone has an important role to play, whether they are acting, singing, or helping with the scenery. We are excited to perform for our families and friends.",
                wordCount: 70
            },
            {
                title: "The School Field Trip",
                text: "We went on a field trip to the local museum yesterday. The museum had exhibits about dinosaurs, ancient civilizations, and space exploration. We learned about how people lived long ago and how scientists study the past. The museum guide showed us artifacts and explained their importance. It was an educational and fun experience that we will remember for a long time.",
                wordCount: 68
            }
        ],
        seventh: [
            {
                title: "The School Newspaper",
                text: "Our school newspaper is written and edited by students with help from our English teacher. Each month, we publish articles about school events, student achievements, and interesting topics. Some students write about sports, while others focus on academic subjects or school clubs. The newspaper helps keep everyone informed about what is happening at our school. It also gives students a chance to practice their writing skills.",
                wordCount: 78
            },
            {
                title: "The School Band",
                text: "Our school band practices every Tuesday and Thursday after school. We have students who play different instruments like trumpets, flutes, and drums. Our band director teaches us how to read music and play together as a group. We perform at school concerts and community events throughout the year. Being in the band helps us learn teamwork and develop our musical talents.",
                wordCount: 76
            },
            {
                title: "The School Art Show",
                text: "Every spring, our school holds an art show to display student artwork. Students create paintings, drawings, sculptures, and other artistic projects throughout the year. The art teacher helps us learn different techniques and encourages us to express our creativity. Parents and community members are invited to view the artwork and celebrate our artistic achievements. The art show is always a highlight of the school year.",
                wordCount: 77
            },
            {
                title: "The School Sports Team",
                text: "Our school has several sports teams including basketball, soccer, and track. Students practice regularly and compete against other schools in our district. Being on a team teaches us about cooperation, dedication, and good sportsmanship. We learn to work together toward common goals and support our teammates. The coaches help us improve our skills while having fun and staying active.",
                wordCount: 75
            },
            {
                title: "The School Technology Lab",
                text: "Our school has a modern technology lab with computers, tablets, and other digital tools. Students use these resources to complete research projects and create presentations. We learn about computer programming, digital design, and online safety. The technology teacher shows us how to use different software programs and websites for learning. These skills will be important for our future education and careers.",
                wordCount: 73
            }
        ],
        eighth: [
            {
                title: "The School Leadership Program",
                text: "Our school has a student leadership program that helps students develop important life skills. Student leaders organize school events, help new students adjust, and work with teachers to improve our school community. They learn about responsibility, communication, and problem-solving. The program includes training sessions where students practice public speaking and teamwork. Many graduates of the program go on to become leaders in high school and beyond.",
                wordCount: 85
            },
            {
                title: "The School Science Club",
                text: "Our school science club meets every Wednesday to explore interesting scientific topics and conduct experiments. We have built model rockets, created chemical reactions, and studied the solar system. The club advisor helps us understand complex scientific concepts through hands-on activities. We also participate in regional science competitions where we present our projects to judges. The science club has sparked many students' interest in pursuing careers in science and technology.",
                wordCount: 82
            },
            {
                title: "The School Community Service",
                text: "Our school encourages students to participate in community service projects throughout the year. We have organized food drives, cleaned up local parks, and visited nursing homes to spend time with elderly residents. These activities help us understand the importance of giving back to our community. Students who complete a certain number of service hours receive recognition at our annual awards ceremony. Community service teaches us valuable lessons about empathy and civic responsibility.",
                wordCount: 84
            },
            {
                title: "The School Career Fair",
                text: "Every year, our school hosts a career fair where professionals from different fields come to talk about their jobs. Students can learn about careers in medicine, engineering, teaching, business, and many other areas. The speakers share their educational backgrounds and explain what their daily work involves. This helps students think about their future career goals and what subjects they might want to study in high school and college.",
                wordCount: 83
            },
            {
                title: "The School Technology Program",
                text: "Our school has an advanced technology program that prepares students for the digital world. We learn about computer programming, digital design, and how to use various software applications. Students work on projects that combine technology with other subjects like art, music, and science. The program includes lessons about online safety and responsible use of technology. These skills will be valuable for students as they continue their education and enter the workforce.",
                wordCount: 81
            }
        ]
    },

    // Maze Comprehension passages
    maze: {
        third: [
            {
                title: "The Weather",
                text: "The weather can change quickly. Sometimes it is sunny and warm. Other times it is cloudy and cool. When it rains, we need to wear raincoats. When it snows, we can build snowmen. The weather affects what we wear and what we do each day.",
                questions: [
                    { position: 3, options: ["can", "will", "should", "might"] },
                    { position: 7, options: ["sunny", "rainy", "snowy", "windy"] },
                    { position: 11, options: ["warm", "cold", "hot", "cool"] },
                    { position: 15, options: ["cloudy", "sunny", "clear", "bright"] },
                    { position: 19, options: ["raincoats", "hats", "shoes", "gloves"] }
                ]
            },
            {
                title: "The School Garden",
                text: "Our school has a beautiful garden. Students plant vegetables and flowers. They water the plants every day. The garden teaches us about nature. We learn how plants grow. The garden makes our school look pretty.",
                questions: [
                    { position: 3, options: ["has", "had", "will have", "having"] },
                    { position: 7, options: ["beautiful", "ugly", "small", "big"] },
                    { position: 11, options: ["plant", "grow", "raise", "cultivate"] },
                    { position: 15, options: ["water", "feed", "care for", "tend"] },
                    { position: 19, options: ["teaches", "shows", "helps", "informs"] }
                ]
            },
            {
                title: "The Library",
                text: "The library is a quiet place. People come here to read books. There are many different kinds of books. You can find books about animals, space, and history. The librarian helps you find what you need. Libraries are important for learning.",
                questions: [
                    { position: 3, options: ["is", "was", "will be", "being"] },
                    { position: 7, options: ["quiet", "loud", "dark", "bright"] },
                    { position: 11, options: ["come", "visit", "go", "travel"] },
                    { position: 15, options: ["many", "few", "some", "all"] },
                    { position: 19, options: ["helps", "assists", "guides", "supports"] }
                ]
            },
            {
                title: "The Playground",
                text: "The playground is where children play. It has swings, slides, and monkey bars. Children run around and have fun. They make friends and play games. The playground is a safe place to play. Everyone enjoys being there.",
                questions: [
                    { position: 3, options: ["is", "was", "will be", "being"] },
                    { position: 7, options: ["where", "when", "why", "how"] },
                    { position: 11, options: ["has", "had", "will have", "having"] },
                    { position: 15, options: ["run", "walk", "sit", "sleep"] },
                    { position: 19, options: ["make", "find", "meet", "become"] }
                ]
            },
            {
                title: "The Art Class",
                text: "Art class is very creative. Students paint pictures and draw. They use different colors and materials. Art helps us express our feelings. We can show what we think and feel. Art makes us happy and proud.",
                questions: [
                    { position: 3, options: ["is", "was", "will be", "being"] },
                    { position: 7, options: ["very", "not", "somewhat", "quite"] },
                    { position: 11, options: ["paint", "draw", "create", "make"] },
                    { position: 15, options: ["use", "try", "find", "choose"] },
                    { position: 19, options: ["helps", "teaches", "shows", "allows"] }
                ]
            }
        ],
        fourth: [
            {
                title: "The Ocean",
                text: "The ocean is a vast body of water that covers most of our planet. It is home to many different kinds of fish and sea creatures. The ocean also provides us with food and helps regulate the Earth's climate. However, pollution is threatening the health of our oceans. We must work together to protect this important resource for future generations.",
                questions: [
                    { position: 4, options: ["vast", "small", "deep", "wide"] },
                    { position: 8, options: ["covers", "fills", "surrounds", "contains"] },
                    { position: 12, options: ["different", "similar", "same", "alike"] },
                    { position: 16, options: ["provides", "gives", "offers", "supplies"] },
                    { position: 20, options: ["regulate", "control", "manage", "adjust"] },
                    { position: 24, options: ["pollution", "cleanliness", "purity", "freshness"] },
                    { position: 28, options: ["threatening", "helping", "improving", "enhancing"] }
                ]
            },
            {
                title: "The Solar System",
                text: "Our solar system consists of eight planets orbiting around the Sun. Each planet has unique characteristics and features. Mercury is the closest planet to the Sun, while Neptune is the farthest. Earth is the only planet known to support life. Scientists continue to study the other planets to learn more about our universe and the possibility of life elsewhere.",
                questions: [
                    { position: 4, options: ["consists", "contains", "includes", "comprises"] },
                    { position: 8, options: ["orbiting", "circling", "revolving", "rotating"] },
                    { position: 12, options: ["unique", "special", "different", "distinctive"] },
                    { position: 16, options: ["characteristics", "features", "qualities", "properties"] },
                    { position: 20, options: ["closest", "nearest", "nearby", "adjacent"] },
                    { position: 24, options: ["farthest", "furthest", "distant", "remote"] },
                    { position: 28, options: ["support", "sustain", "maintain", "preserve"] }
                ]
            },
            {
                title: "The Rainforest",
                text: "Rainforests are dense forests found in tropical regions around the world. They are home to an incredible variety of plants and animals. Many species found in rainforests exist nowhere else on Earth. These forests play a crucial role in producing oxygen and regulating global climate. However, deforestation is destroying rainforests at an alarming rate, threatening countless species and affecting the entire planet.",
                questions: [
                    { position: 4, options: ["dense", "sparse", "thin", "light"] },
                    { position: 8, options: ["found", "lost", "hidden", "buried"] },
                    { position: 12, options: ["incredible", "ordinary", "common", "usual"] },
                    { position: 16, options: ["variety", "sameness", "uniformity", "consistency"] },
                    { position: 20, options: ["exist", "disappear", "vanish", "fade"] },
                    { position: 24, options: ["crucial", "unimportant", "minor", "trivial"] },
                    { position: 28, options: ["destroying", "building", "creating", "making"] }
                ]
            },
            {
                title: "The Human Brain",
                text: "The human brain is one of the most complex organs in the body. It controls all of our thoughts, emotions, and actions. The brain contains billions of nerve cells called neurons. These neurons communicate with each other through electrical and chemical signals. Scientists are still learning about how the brain works and how it creates consciousness.",
                questions: [
                    { position: 4, options: ["complex", "complicated", "intricate", "sophisticated"] },
                    { position: 8, options: ["controls", "manages", "directs", "regulates"] },
                    { position: 12, options: ["emotions", "feelings", "moods", "sentiments"] },
                    { position: 16, options: ["contains", "holds", "includes", "encompasses"] },
                    { position: 20, options: ["billions", "millions", "thousands", "hundreds"] },
                    { position: 24, options: ["communicate", "interact", "connect", "relate"] },
                    { position: 28, options: ["electrical", "electronic", "digital", "magnetic"] }
                ]
            },
            {
                title: "The Water Cycle",
                text: "The water cycle is the continuous movement of water through Earth's atmosphere, land, and oceans. Water evaporates from oceans and lakes, forming clouds in the sky. When clouds become heavy with water, precipitation falls as rain or snow. This water flows back to oceans and lakes, completing the cycle. The water cycle is essential for all life on Earth and helps distribute water around the planet.",
                questions: [
                    { position: 4, options: ["continuous", "stopping", "ending", "finishing"] },
                    { position: 8, options: ["movement", "stillness", "rest", "pause"] },
                    { position: 12, options: ["evaporates", "condenses", "freezes", "melts"] },
                    { position: 16, options: ["forming", "destroying", "breaking", "splitting"] },
                    { position: 20, options: ["heavy", "light", "empty", "hollow"] },
                    { position: 24, options: ["precipitation", "evaporation", "condensation", "transpiration"] },
                    { position: 28, options: ["essential", "optional", "unnecessary", "extra"] }
                ]
            }
        ],
        fifth: [
            {
                title: "The Solar System",
                text: "Our solar system consists of eight planets orbiting around the Sun. Each planet has unique characteristics and features. Mercury is the closest planet to the Sun, while Neptune is the farthest. Earth is the only planet known to support life. Scientists continue to study the other planets to learn more about our universe and the possibility of life elsewhere.",
                questions: [
                    { position: 4, options: ["consists", "contains", "includes", "comprises"] },
                    { position: 8, options: ["orbiting", "circling", "revolving", "rotating"] },
                    { position: 12, options: ["unique", "special", "different", "distinctive"] },
                    { position: 16, options: ["characteristics", "features", "qualities", "properties"] },
                    { position: 20, options: ["closest", "nearest", "nearby", "adjacent"] },
                    { position: 24, options: ["farthest", "furthest", "distant", "remote"] },
                    { position: 28, options: ["support", "sustain", "maintain", "preserve"] },
                    { position: 32, options: ["continue", "persist", "proceed", "persevere"] }
                ]
            },
            {
                title: "The American Revolution",
                text: "The American Revolution was a war fought between the American colonies and Great Britain from 1775 to 1783. The colonists were fighting for independence and freedom from British rule. Key figures like George Washington and Thomas Jefferson played important roles in the conflict. The war ended with the Treaty of Paris, which recognized American independence. This revolution inspired other countries around the world to fight for their own freedom.",
                questions: [
                    { position: 4, options: ["fought", "avoided", "prevented", "stopped"] },
                    { position: 8, options: ["colonies", "countries", "states", "nations"] },
                    { position: 12, options: ["fighting", "avoiding", "preventing", "stopping"] },
                    { position: 16, options: ["independence", "dependence", "reliance", "submission"] },
                    { position: 20, options: ["freedom", "slavery", "captivity", "imprisonment"] },
                    { position: 24, options: ["key", "minor", "unimportant", "trivial"] },
                    { position: 28, options: ["important", "unimportant", "minor", "trivial"] },
                    { position: 32, options: ["recognized", "ignored", "denied", "rejected"] }
                ]
            },
            {
                title: "The Human Body",
                text: "The human body is an amazing machine made up of many different systems working together. The circulatory system pumps blood throughout the body, carrying oxygen and nutrients to all cells. The nervous system controls all body functions and allows us to think and feel. The digestive system breaks down food so the body can use it for energy. All these systems work together to keep us alive and healthy.",
                questions: [
                    { position: 4, options: ["amazing", "ordinary", "common", "usual"] },
                    { position: 8, options: ["machine", "animal", "plant", "mineral"] },
                    { position: 12, options: ["systems", "parts", "pieces", "fragments"] },
                    { position: 16, options: ["working", "stopping", "resting", "sleeping"] },
                    { position: 20, options: ["pumps", "stops", "blocks", "prevents"] },
                    { position: 24, options: ["carrying", "dropping", "losing", "forgetting"] },
                    { position: 28, options: ["controls", "ignores", "abandons", "neglects"] },
                    { position: 32, options: ["breaks", "builds", "creates", "makes"] }
                ]
            },
            {
                title: "The Environment",
                text: "Environmental protection is crucial for the future of our planet. Human activities like pollution and deforestation are causing serious problems. Climate change is affecting weather patterns and sea levels around the world. We must take action to reduce our impact on the environment. This includes using renewable energy, recycling, and protecting natural habitats. Everyone can help make a difference for future generations.",
                questions: [
                    { position: 4, options: ["crucial", "unimportant", "minor", "trivial"] },
                    { position: 8, options: ["future", "past", "present", "now"] },
                    { position: 12, options: ["activities", "inactivities", "rest", "sleep"] },
                    { position: 16, options: ["causing", "preventing", "stopping", "ending"] },
                    { position: 20, options: ["serious", "minor", "small", "unimportant"] },
                    { position: 24, options: ["affecting", "ignoring", "avoiding", "preventing"] },
                    { position: 28, options: ["must", "shouldn't", "can't", "won't"] },
                    { position: 32, options: ["reduce", "increase", "grow", "expand"] }
                ]
            },
            {
                title: "The Internet",
                text: "The Internet has revolutionized the way people communicate and access information. It connects people around the world instantly and provides access to vast amounts of knowledge. However, it also presents challenges like cyberbullying and privacy concerns. Students must learn to use the Internet safely and responsibly. The Internet is a powerful tool that can be used for both good and bad purposes.",
                questions: [
                    { position: 4, options: ["revolutionized", "destroyed", "ruined", "damaged"] },
                    { position: 8, options: ["communicate", "ignore", "avoid", "prevent"] },
                    { position: 12, options: ["access", "deny", "refuse", "reject"] },
                    { position: 16, options: ["connects", "disconnects", "separates", "divides"] },
                    { position: 20, options: ["instantly", "slowly", "gradually", "eventually"] },
                    { position: 24, options: ["presents", "hides", "conceals", "covers"] },
                    { position: 28, options: ["challenges", "solutions", "answers", "fixes"] },
                    { position: 32, options: ["safely", "dangerously", "carelessly", "recklessly"] }
                ]
            }
        ],
        sixth: [
            {
                title: "The Human Brain",
                text: "The human brain is one of the most complex organs in the body. It controls all of our thoughts, emotions, and actions. The brain contains billions of nerve cells called neurons. These neurons communicate with each other through electrical and chemical signals. Scientists are still learning about how the brain works and how it creates consciousness.",
                questions: [
                    { position: 4, options: ["complex", "complicated", "intricate", "sophisticated"] },
                    { position: 8, options: ["controls", "manages", "directs", "regulates"] },
                    { position: 12, options: ["emotions", "feelings", "moods", "sentiments"] },
                    { position: 16, options: ["contains", "holds", "includes", "encompasses"] },
                    { position: 20, options: ["billions", "millions", "thousands", "hundreds"] },
                    { position: 24, options: ["communicate", "interact", "connect", "relate"] },
                    { position: 28, options: ["electrical", "electronic", "digital", "magnetic"] },
                    { position: 32, options: ["chemical", "biological", "physical", "natural"] }
                ]
            },
            {
                title: "The Renaissance Period",
                text: "The Renaissance was a period of great cultural and intellectual change that began in Italy during the 14th century. This era marked the transition from medieval to modern times. Artists like Leonardo da Vinci and Michelangelo created masterpieces that are still admired today. Scientists like Galileo challenged traditional beliefs about the universe. The invention of the printing press made books more accessible to ordinary people, spreading knowledge throughout Europe.",
                questions: [
                    { position: 4, options: ["great", "small", "minor", "unimportant"] },
                    { position: 8, options: ["cultural", "physical", "natural", "artificial"] },
                    { position: 12, options: ["intellectual", "emotional", "physical", "spiritual"] },
                    { position: 16, options: ["began", "ended", "stopped", "finished"] },
                    { position: 20, options: ["marked", "ignored", "avoided", "prevented"] },
                    { position: 24, options: ["transition", "stagnation", "stoppage", "end"] },
                    { position: 28, options: ["created", "destroyed", "ruined", "damaged"] },
                    { position: 32, options: ["challenged", "accepted", "agreed", "supported"] }
                ]
            },
            {
                title: "The Industrial Revolution",
                text: "The Industrial Revolution transformed society in ways that are still felt today. New machines and manufacturing processes changed how goods were produced. Cities grew rapidly as people moved from rural areas to find work in factories. This period brought both great progress and significant challenges. Working conditions were often dangerous and unhealthy. However, it also led to innovations that improved the quality of life for many people.",
                questions: [
                    { position: 4, options: ["transformed", "destroyed", "ruined", "damaged"] },
                    { position: 8, options: ["society", "nature", "animals", "plants"] },
                    { position: 12, options: ["still", "never", "rarely", "seldom"] },
                    { position: 16, options: ["felt", "ignored", "avoided", "prevented"] },
                    { position: 20, options: ["machines", "animals", "plants", "people"] },
                    { position: 24, options: ["processes", "stoppages", "ends", "finishes"] },
                    { position: 28, options: ["changed", "kept", "maintained", "preserved"] },
                    { position: 32, options: ["grew", "shrank", "decreased", "diminished"] }
                ]
            },
            {
                title: "The Scientific Method",
                text: "The scientific method is a systematic approach to understanding the natural world through observation and experimentation. Scientists begin by asking questions and forming hypotheses. They then design experiments to test their ideas and collect data. The results are analyzed to draw conclusions, which may lead to new questions. This process has led to countless discoveries and technological advances throughout history.",
                questions: [
                    { position: 4, options: ["systematic", "random", "chaotic", "disorganized"] },
                    { position: 8, options: ["approach", "avoidance", "prevention", "stopping"] },
                    { position: 12, options: ["understanding", "ignoring", "avoiding", "preventing"] },
                    { position: 16, options: ["natural", "artificial", "fake", "false"] },
                    { position: 20, options: ["observation", "ignoring", "avoiding", "preventing"] },
                    { position: 24, options: ["experimentation", "avoidance", "prevention", "stopping"] },
                    { position: 28, options: ["begin", "end", "stop", "finish"] },
                    { position: 32, options: ["asking", "avoiding", "ignoring", "preventing"] }
                ]
            },
            {
                title: "The Global Economy",
                text: "International trade has created a complex global economy where countries depend on each other for goods and services. Multinational corporations operate across borders, creating jobs and economic opportunities worldwide. However, this interconnectedness also means that economic problems in one country can affect others. Understanding global economics is essential for addressing issues like poverty, inequality, and sustainable development.",
                questions: [
                    { position: 4, options: ["created", "destroyed", "ruined", "damaged"] },
                    { position: 8, options: ["complex", "simple", "easy", "basic"] },
                    { position: 12, options: ["global", "local", "personal", "individual"] },
                    { position: 16, options: ["countries", "people", "animals", "plants"] },
                    { position: 20, options: ["depend", "independ", "avoid", "prevent"] },
                    { position: 24, options: ["operate", "stop", "end", "finish"] },
                    { position: 28, options: ["borders", "centers", "middles", "insides"] },
                    { position: 32, options: ["creating", "destroying", "ruining", "damaging"] }
                ]
            }
        ],
        seventh: [
            {
                title: "The Renaissance",
                text: "The Renaissance was a period of cultural rebirth that began in Italy during the 14th century. This era marked a transition from medieval to modern thinking. Artists, scientists, and philosophers made groundbreaking discoveries and created masterpieces. The invention of the printing press revolutionized the spread of knowledge. This period laid the foundation for many aspects of modern Western civilization.",
                questions: [
                    { position: 4, options: ["rebirth", "revival", "renewal", "resurgence"] },
                    { position: 8, options: ["began", "started", "commenced", "initiated"] },
                    { position: 12, options: ["transition", "change", "shift", "transformation"] },
                    { position: 16, options: ["medieval", "ancient", "old", "traditional"] },
                    { position: 20, options: ["groundbreaking", "revolutionary", "innovative", "pioneering"] },
                    { position: 24, options: ["discoveries", "findings", "breakthroughs", "revelations"] },
                    { position: 28, options: ["masterpieces", "works", "creations", "artworks"] },
                    { position: 32, options: ["revolutionized", "transformed", "changed", "altered"] },
                    { position: 36, options: ["foundation", "basis", "groundwork", "base"] }
                ]
            },
            {
                title: "The Scientific Revolution",
                text: "The Scientific Revolution of the 16th and 17th centuries fundamentally changed how people understood the natural world. Scientists like Copernicus, Galileo, and Newton challenged traditional beliefs and developed new methods of inquiry. The heliocentric model of the solar system replaced the geocentric view. This period established the foundation for modern science and technology, influencing everything from medicine to space exploration.",
                questions: [
                    { position: 4, options: ["fundamentally", "slightly", "barely", "hardly"] },
                    { position: 8, options: ["changed", "kept", "maintained", "preserved"] },
                    { position: 12, options: ["understood", "misunderstood", "ignored", "avoided"] },
                    { position: 16, options: ["natural", "artificial", "fake", "false"] },
                    { position: 20, options: ["challenged", "accepted", "agreed", "supported"] },
                    { position: 24, options: ["traditional", "modern", "new", "recent"] },
                    { position: 28, options: ["developed", "destroyed", "ruined", "damaged"] },
                    { position: 32, options: ["methods", "problems", "issues", "difficulties"] },
                    { position: 36, options: ["established", "destroyed", "ruined", "damaged"] }
                ]
            },
            {
                title: "The Age of Exploration",
                text: "The Age of Exploration was a period of extensive overseas exploration that began in the 15th century. European explorers like Columbus, Magellan, and da Gama sailed to previously unknown lands. These voyages led to the discovery of new continents and the establishment of global trade routes. However, exploration also brought conflict, disease, and exploitation to indigenous populations. The consequences of this era continue to shape our world today.",
                questions: [
                    { position: 4, options: ["extensive", "limited", "small", "minimal"] },
                    { position: 8, options: ["overseas", "local", "nearby", "close"] },
                    { position: 12, options: ["exploration", "avoidance", "prevention", "stopping"] },
                    { position: 16, options: ["began", "ended", "stopped", "finished"] },
                    { position: 20, options: ["sailed", "walked", "flew", "drove"] },
                    { position: 24, options: ["previously", "recently", "lately", "now"] },
                    { position: 28, options: ["unknown", "known", "familiar", "recognized"] },
                    { position: 32, options: ["led", "prevented", "stopped", "ended"] },
                    { position: 36, options: ["discovery", "loss", "destruction", "ruin"] }
                ]
            },
            {
                title: "The Enlightenment",
                text: "The Enlightenment was an intellectual movement that emphasized reason, science, and individual rights. Thinkers like Voltaire, Rousseau, and Locke challenged traditional authority and promoted democratic ideals. This period influenced the American and French Revolutions and shaped modern political thought. The Enlightenment's emphasis on human rights and scientific inquiry continues to influence contemporary society and governance.",
                questions: [
                    { position: 4, options: ["intellectual", "physical", "emotional", "spiritual"] },
                    { position: 8, options: ["movement", "stoppage", "end", "finish"] },
                    { position: 12, options: ["emphasized", "ignored", "avoided", "prevented"] },
                    { position: 16, options: ["reason", "emotion", "feeling", "intuition"] },
                    { position: 20, options: ["science", "art", "music", "dance"] },
                    { position: 24, options: ["individual", "collective", "group", "team"] },
                    { position: 28, options: ["challenged", "accepted", "agreed", "supported"] },
                    { position: 32, options: ["traditional", "modern", "new", "recent"] },
                    { position: 36, options: ["authority", "freedom", "liberty", "independence"] }
                ]
            },
            {
                title: "The Digital Age",
                text: "The Digital Age has transformed communication, education, and commerce through computer technology and the Internet. Social media platforms have created new ways for people to connect and share information. E-commerce has revolutionized shopping and business practices. However, this digital transformation has also raised concerns about privacy, cybersecurity, and the digital divide. Society must navigate these challenges while harnessing the benefits of digital technology.",
                questions: [
                    { position: 4, options: ["transformed", "destroyed", "ruined", "damaged"] },
                    { position: 8, options: ["communication", "silence", "quiet", "stillness"] },
                    { position: 12, options: ["education", "ignorance", "stupidity", "foolishness"] },
                    { position: 16, options: ["commerce", "poverty", "want", "need"] },
                    { position: 20, options: ["through", "without", "against", "despite"] },
                    { position: 24, options: ["computer", "book", "paper", "pen"] },
                    { position: 28, options: ["technology", "nature", "animals", "plants"] },
                    { position: 32, options: ["created", "destroyed", "ruined", "damaged"] },
                    { position: 36, options: ["new", "old", "ancient", "traditional"] }
                ]
            }
        ],
        eighth: [
            {
                title: "The Industrial Revolution",
                text: "The Industrial Revolution fundamentally transformed society and the economy during the 18th and 19th centuries. New manufacturing processes and machinery revolutionized production methods. This period saw the rise of factories and urbanization as people moved from rural areas to cities. While it brought unprecedented economic growth, it also created new social challenges including poor working conditions and environmental pollution. The effects of this revolution continue to influence modern society today.",
                questions: [
                    { position: 4, options: ["fundamentally", "completely", "entirely", "thoroughly"] },
                    { position: 8, options: ["transformed", "changed", "altered", "modified"] },
                    { position: 12, options: ["processes", "methods", "procedures", "techniques"] },
                    { position: 16, options: ["revolutionized", "transformed", "changed", "altered"] },
                    { position: 20, options: ["production", "manufacturing", "creation", "making"] },
                    { position: 24, options: ["urbanization", "city growth", "urban development", "metropolitan expansion"] },
                    { position: 28, options: ["unprecedented", "unprecedented", "unprecedented", "unprecedented"] },
                    { position: 32, options: ["challenges", "problems", "difficulties", "obstacles"] },
                    { position: 36, options: ["conditions", "situations", "circumstances", "environments"] },
                    { position: 40, options: ["pollution", "contamination", "dirtiness", "impurity"] }
                ]
            },
            {
                title: "The Civil Rights Movement",
                text: "The Civil Rights Movement of the 1950s and 1960s was a pivotal moment in American history. Led by figures like Martin Luther King Jr. and Rosa Parks, this movement fought against racial segregation and discrimination. Through peaceful protests, boycotts, and legal challenges, activists worked to ensure equal rights for all citizens. The movement achieved significant victories, including the Civil Rights Act of 1964 and the Voting Rights Act of 1965. These changes helped create a more just and equal society.",
                questions: [
                    { position: 4, options: ["pivotal", "unimportant", "minor", "trivial"] },
                    { position: 8, options: ["moment", "period", "time", "era"] },
                    { position: 12, options: ["American", "foreign", "international", "global"] },
                    { position: 16, options: ["history", "future", "present", "now"] },
                    { position: 20, options: ["Led", "Followed", "Obeyed", "Listened"] },
                    { position: 24, options: ["figures", "numbers", "statistics", "data"] },
                    { position: 28, options: ["fought", "avoided", "prevented", "stopped"] },
                    { position: 32, options: ["against", "for", "with", "along"] },
                    { position: 36, options: ["racial", "personal", "individual", "private"] },
                    { position: 40, options: ["segregation", "integration", "unity", "togetherness"] }
                ]
            },
            {
                title: "The Space Race",
                text: "The Space Race between the United States and the Soviet Union during the Cold War era was one of the most exciting periods in scientific history. It began with the launch of Sputnik in 1957 and reached its peak with the Apollo moon landings. This competition drove incredible advances in technology and engineering. The space program led to innovations in computers, materials science, and telecommunications. Today, the International Space Station represents international cooperation in space exploration.",
                questions: [
                    { position: 4, options: ["between", "within", "inside", "among"] },
                    { position: 8, options: ["United", "Divided", "Separated", "Split"] },
                    { position: 12, options: ["States", "Countries", "Nations", "Lands"] },
                    { position: 16, options: ["Soviet", "American", "European", "Asian"] },
                    { position: 20, options: ["Union", "Division", "Separation", "Split"] },
                    { position: 24, options: ["Cold", "Hot", "Warm", "Cool"] },
                    { position: 28, options: ["War", "Peace", "Truce", "Ceasefire"] },
                    { position: 32, options: ["era", "period", "time", "age"] },
                    { position: 36, options: ["exciting", "boring", "dull", "uninteresting"] },
                    { position: 40, options: ["periods", "times", "ages", "eras"] }
                ]
            },
            {
                title: "The Constitutional Framework",
                text: "The United States Constitution established a system of government based on the principles of federalism, separation of powers, and checks and balances. The three branches of government—executive, legislative, and judicial—each have distinct responsibilities and powers. This system was designed to prevent any single branch from becoming too powerful. The Constitution has been amended over time to address changing needs and values, reflecting the evolving nature of American democracy.",
                questions: [
                    { position: 4, options: ["established", "destroyed", "ruined", "damaged"] },
                    { position: 8, options: ["system", "chaos", "disorder", "confusion"] },
                    { position: 12, options: ["government", "anarchy", "lawlessness", "disorder"] },
                    { position: 16, options: ["based", "founded", "built", "constructed"] },
                    { position: 20, options: ["principles", "ideas", "concepts", "notions"] },
                    { position: 24, options: ["federalism", "centralism", "unitarism", "monism"] },
                    { position: 28, options: ["separation", "union", "unity", "togetherness"] },
                    { position: 32, options: ["powers", "weaknesses", "limitations", "restrictions"] },
                    { position: 36, options: ["checks", "unchecks", "unbalances", "imbalances"] },
                    { position: 40, options: ["balances", "imbalances", "unbalances", "disbalances"] }
                ]
            },
            {
                title: "The Environmental Crisis",
                text: "Environmental challenges such as climate change, pollution, and biodiversity loss require immediate attention and coordinated action. Scientists have documented rising global temperatures, melting ice caps, and increasing extreme weather events. Governments, businesses, and individuals must work together to reduce greenhouse gas emissions and protect natural ecosystems. Sustainable development practices and renewable energy technologies offer hope for addressing these critical issues.",
                questions: [
                    { position: 4, options: ["challenges", "solutions", "answers", "fixes"] },
                    { position: 8, options: ["such", "like", "including", "for"] },
                    { position: 12, options: ["climate", "weather", "temperature", "heat"] },
                    { position: 16, options: ["change", "stability", "consistency", "permanence"] },
                    { position: 20, options: ["pollution", "cleanliness", "purity", "freshness"] },
                    { position: 24, options: ["biodiversity", "uniformity", "sameness", "monotony"] },
                    { position: 28, options: ["loss", "gain", "increase", "growth"] },
                    { position: 32, options: ["require", "need", "demand", "call"] },
                    { position: 36, options: ["immediate", "delayed", "postponed", "deferred"] },
                    { position: 40, options: ["attention", "ignorance", "neglect", "disregard"] }
                ]
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
        const difficulty = grade === 'K' ? 'easy' : grade <= '2' ? 'medium' : 'hard';
        const letters = DIBELS_CONTENT.lnf[difficulty];
        const count = options.count || 100;
        
        const content = [];
        for (let i = 0; i < count; i++) {
            content.push(letters[Math.floor(Math.random() * letters.length)]);
        }
        
        return {
            type: 'LNF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.LNF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.LNF.timeLimit
        };
    },

    // Generate Phonemic Segmentation Fluency content
    generatePSF(grade, options) {
        const wordLists = DIBELS_CONTENT.psf;
        let words = [];
        
        if (grade === 'K' || grade === '1') {
            words = [...wordLists.twoPhonemes, ...wordLists.threePhonemes];
        } else if (grade === '2') {
            words = [...wordLists.threePhonemes, ...wordLists.fourPhonemes];
        } else {
            words = [...wordLists.fourPhonemes, ...wordLists.fivePhonemes];
        }
        
        const count = options.count || 20;
        const content = [];
        for (let i = 0; i < count; i++) {
            content.push(words[Math.floor(Math.random() * words.length)]);
        }
        
        return {
            type: 'PSF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.PSF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.PSF.timeLimit
        };
    },

    // Generate Nonsense Word Fluency content
    generateNWF(grade, options) {
        const wordLists = DIBELS_CONTENT.nwf;
        let words = [];
        
        if (grade === 'K' || grade === '1') {
            words = [...wordLists.cv, ...wordLists.vc];
        } else if (grade === '2') {
            words = [...wordLists.cv, ...wordLists.vc, ...wordLists.cvc];
        } else {
            words = [...wordLists.cvc, ...wordLists.ccvc, ...wordLists.cvcc];
        }
        
        const count = options.count || 50;
        const content = [];
        for (let i = 0; i < count; i++) {
            content.push(words[Math.floor(Math.random() * words.length)]);
        }
        
        return {
            type: 'NWF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.NWF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.NWF.timeLimit
        };
    },

    // Generate Word Reading Fluency content
    generateWRF(grade, options) {
        const gradeKey = grade === 'K' ? 'kindergarten' : `grade${grade}`;
        const words = DIBELS_CONTENT.wrf[gradeKey] || DIBELS_CONTENT.wrf.kindergarten;
        
        const count = options.count || 50;
        const content = [];
        for (let i = 0; i < count; i++) {
            content.push(words[Math.floor(Math.random() * words.length)]);
        }
        
        return {
            type: 'WRF',
            content: content,
            instructions: DIBELS_CONTENT.subtestDescriptions.WRF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.WRF.timeLimit
        };
    },

    // Generate Oral Reading Fluency content
    generateORF(grade, options) {
        const gradeKey = grade === 'K' ? 'kindergarten' : `grade${grade}`;
        const passages = DIBELS_CONTENT.orf[gradeKey] || DIBELS_CONTENT.orf.kindergarten;
        
        const passage = passages[Math.floor(Math.random() * passages.length)];
        
        return {
            type: 'ORF',
            content: passage,
            instructions: DIBELS_CONTENT.subtestDescriptions.ORF.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.ORF.timeLimit
        };
    },

    // Generate Maze Comprehension content
    generateMaze(grade, options) {
        const gradeKey = `grade${grade}`;
        const passages = DIBELS_CONTENT.maze[gradeKey] || DIBELS_CONTENT.maze.third;
        
        const passage = passages[Math.floor(Math.random() * passages.length)];
        
        return {
            type: 'Maze',
            content: passage,
            instructions: DIBELS_CONTENT.subtestDescriptions.Maze.instructions,
            timeLimit: DIBELS_CONTENT.subtestDescriptions.Maze.timeLimit
        };
    },

    // Shuffle array
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DIBELS_CONTENT, ContentGenerator };
}
