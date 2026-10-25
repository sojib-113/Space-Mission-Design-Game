/**
 * GOKU: SPACE MISSION COMMANDER
 * Game Data, Missions, Solar System Encyclopedia & Bilingual Localization
 * Based on Mission Script PDF & Solar System Infographics
 */

const PLANETS_DATA = [
  {
    id: 'mercury',
    name: 'Mercury',
    bengaliName: 'বুধ',
    tagline: 'Smallest & Fastest Planet',
    color: '#8c8c94',
    glow: '#b0b0c0',
    distanceSun: '57.9M km',
    diameter: '4,879 km',
    moons: 0,
    temp: '167°C avg (-180°C to 430°C)',
    orbitalPeriod: '88 Earth days',
    rotationPeriod: '59 Earth days',
    facts: [
      'Mercury is the smallest planet of our solar system.',
      'It is the closest planet to the Sun and is the fastest planet in the solar system, orbiting at ~47 km/s.',
      'Despite being closest to the Sun, it is not the hottest planet because it lacks an atmosphere to trap heat.',
      'A year on Mercury is only 88 days long!'
    ],
    bengaliFacts: [
      'বুধ আমাদের সৌরজগতের ক্ষুদ্রতম গ্রহ।',
      'এটি সূর্যের নিকটতম এবং সৌরজগতের সবচেয়ে দ্রুতগামী গ্রহ (~৪৭ কিমি/সেকেন্ড)।',
      'বায়ুমণ্ডল না থাকায় সূর্যের সবচেয়ে কাছে হলেও এটি উষ্ণতম গ্রহ নয়।',
      'বুধের ১ বছর মাত্র ৮৮ দিনে পূর্ণ হয়!'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    bengaliName: 'শুক্র',
    tagline: 'Hottest Planet & Volcano World',
    color: '#e3bb76',
    glow: '#ffd79e',
    distanceSun: '108.2M km',
    diameter: '12,104 km',
    moons: 0,
    temp: 'Up to 450°C',
    orbitalPeriod: '225 Earth days',
    rotationPeriod: '243 Earth days (Retrograde)',
    facts: [
      'Venus is the hottest planet in the solar system; temperature can rise up to 450 degrees Celsius.',
      'Venus is covered with volcanoes and dense clouds of sulfuric acid with runaway greenhouse effect.',
      'Venus is very bright in Earth\'s sky and does not have any moons.',
      'It is the only planet that spins in the opposite direction (retrograde) to all other planets!'
    ],
    bengaliFacts: [
      'শুক্র সৌরজগতের সবচেয়ে উষ্ণ গ্রহ; তাপমাত্রা ৪৫০ ডিগ্রি সেলসিয়াস পর্যন্ত পৌঁছায়।',
      'শুক্র হাজার হাজার আগ্নেয়গিরি ও ঘন সালফিউরিক অ্যাসিড মেঘে ঢাকা।',
      'শুক্রের কোনো উপগ্রহ বা চাঁদ নেই এবং এটি রাতের আকাশে অত্যন্ত উজ্জ্বল।',
      'এটি একমাত্র গ্রহ যা অন্যান্য সমস্ত গ্রহের বিপরীত দিকে (পশ্চিমে) আবর্তন করে!'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    bengaliName: 'পৃথিবী',
    tagline: 'Our Home & The Blue Marble',
    color: '#4b9cd3',
    glow: '#68c5ff',
    distanceSun: '149.6M km',
    diameter: '12,742 km',
    moons: 1,
    temp: '15°C avg',
    orbitalPeriod: '365.25 days',
    rotationPeriod: '24 hours',
    facts: [
      'Earth is the fifth largest planet of our solar system and the third planet from the Sun.',
      'Earth is the only place known in the universe where there is life.',
      'About 70% of Earth\'s surface is covered with water.',
      'Has one natural satellite: The Moon (Luna).'
    ],
    bengaliFacts: [
      'পৃথিবী সৌরজগতের পঞ্চম বৃহত্তম এবং সূর্য থেকে তৃতীয় গ্রহ।',
      'সমগ্র মহাবিশ্বে একমাত্র পৃথিবীতেই জীবনের অস্তিত্ব নিশ্চিত।',
      'পৃথিবীর উপরিভাগের প্রায় ৭০% জলভাগ দ্বারা আচ্ছাদিত।',
      'এর একমাত্র প্রাকৃতিক উপগ্রহ হল আমাদের চাঁদ।'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    bengaliName: 'মঙ্গল',
    tagline: 'The Red Planet',
    color: '#d14a28',
    glow: '#ff734b',
    distanceSun: '227.9M km',
    diameter: '6,779 km',
    moons: 2,
    temp: '-63°C avg (-140°C to 20°C)',
    orbitalPeriod: '687 Earth days',
    rotationPeriod: '24h 37m',
    facts: [
      'Mars is also called the Red Planet, colored by iron oxide (rust) on its surface.',
      'Named after the Roman god of war.',
      'Mars has two small potato-shaped moons: Phobos and Deimos.',
      'The temperature varies from extremely cold to hot, but there is water ice at the polar caps!'
    ],
    bengaliFacts: [
      'মার্সকে এর মরচে-ধরা লাল মাটির জন্য লাল গ্রহ বলা হয়।',
      'রোমান যুদ্ধের দেবতার নামে এর নামকরণ।',
      'মঙ্গলের দুটি ক্ষুদ্র উপগ্রহ রয়েছে: ফোবোস এবং ডিমোস।',
      'এর দুই মেরুতে হিমায়িত বরফের আস্তরণ রয়েছে।'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    bengaliName: 'বৃহস্পতি',
    tagline: 'The Gas Giant King',
    color: '#c99661',
    glow: '#e0b480',
    distanceSun: '778.5M km',
    diameter: '139,820 km',
    moons: 95,
    temp: '-110°C',
    orbitalPeriod: '11.86 Earth years',
    rotationPeriod: '9h 56m',
    facts: [
      'Jupiter is the largest planet of the solar system, a gas giant made primarily of hydrogen and helium.',
      'More than two times bigger than all other planets combined; over 300 Earths can fit inside Jupiter!',
      'Has more than 80 moons (95 officially recognized, including Ganymede and Europa).',
      'Features the Great Red Spot: a giant storm bigger than Earth that has raged for centuries!'
    ],
    bengaliFacts: [
      'বৃহস্পতি সৌরজগতের বৃহত্তম গ্রহ, যা প্রধানত হাইড্রোজেন এবং হিলিয়াম গ্যাসে গঠিত।',
      'অন্যান্য সমস্ত গ্রহের মিলিত ভরের দ্বিগুণেরও বেশি; ৩০০টিরও বেশি পৃথিবী বৃহস্পতির ভেতরে এঁটে যাবে!',
      'এর ৮০টিরও বেশি উপগ্রহ বা চাঁদ রয়েছে (গ্যানিমিড, ইউরোপা ইত্যাদি)।',
      'এর বিশাল গ্রেট রেড স্পট ঝড়টি পৃথিবীর চেয়েও বড় এবং শত শত বছর ধরে চলছে!'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    bengaliName: 'শনি',
    tagline: 'The Jewel of the Solar System',
    color: '#e2bf7d',
    glow: '#f5dd98',
    distanceSun: '1.43B km',
    diameter: '116,460 km',
    moons: 146,
    temp: '-140°C',
    orbitalPeriod: '29.4 Earth years',
    rotationPeriod: '10h 33m',
    facts: [
      'Saturn is the second largest planet in the Solar System, made entirely of gas.',
      'Saturn is famous for its majestic planetary rings made of billions of chunks of ice, rocks, and dust.',
      'It has the most confirmed moons of any planet in the solar system (146 moons, including Titan with an atmosphere).',
      'Saturn is so light in density that it could theoretically float on water if an ocean were big enough!'
    ],
    bengaliFacts: [
      'শনি সৌরজগতের দ্বিতীয় বৃহত্তম গ্রহ, যা গ্যাসীয় উপাদানে গঠিত।',
      'শনির চারপাশের দৃষ্টিনন্দন বলয়টি বরফের টুকরো, পাথর ও মহাজাগতিক ধূলিকণা দ্বারা তৈরি।',
      'সৌরজগতে শনির সবচেয়ে বেশি উপগ্রহ রয়েছে (১৪৬টি চাঁদ, যার মধ্যে টাইটান অন্যতম)।',
      'শনির ঘনত্ব এতই কম যে যথেষ্ট বড় পানির পাত্র পেলে এটি পানিতে ভেসে থাকবে!'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    bengaliName: 'ইউরেনাস',
    tagline: 'The Tilted Ice Giant',
    color: '#a7d9db',
    glow: '#c5f2f4',
    distanceSun: '2.87B km',
    diameter: '50,724 km',
    moons: 28,
    temp: '-225°C avg',
    orbitalPeriod: '84 Earth years',
    rotationPeriod: '17h 14m (Tilted 98°)',
    facts: [
      'Uranus is the coldest planet in the solar system with an average temperature of -225 degrees Celsius.',
      'Uranus spins on its side with an axial tilt of 98 degrees, rolling around the Sun like a ball.',
      'Because of this extreme tilt, each pole experiences 42 years of continuous sunlight followed by 42 years of darkness (21-year polar nights).',
      'Its atmosphere is rich in methane ice, giving it a calm cyan-blue hue.'
    ],
    bengaliFacts: [
      'ইউরেনাস সৌরজগতের সবচেয়ে শীতলতম গ্রহ, গড় তাপমাত্রা প্রায় -২২৫° সেলসিয়াস।',
      'ইউরেনাস তার অক্ষের ওপর প্রায় শুয়ে (৯৮ ডিগ্রি কোণে কাত হয়ে) সূর্যের চারদিকে ঘোরে।',
      'এই চরম বাঁকের কারণে এর প্রতিটি মেরুতে টানা ৪২ বছর দিন এবং টানা ৪২ বছর রাতের অন্ধকার থাকে।',
      'মিথেন গ্যাসের কারণে এটি সুন্দর নীলাভ-সবুজ রঙে আলোকিত।'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    bengaliName: 'নেপচুন',
    tagline: 'The Blue Windy Outpost',
    color: '#3854db',
    glow: '#6784ff',
    distanceSun: '4.5B km',
    diameter: '49,244 km',
    moons: 16,
    temp: '-214°C',
    orbitalPeriod: '165 Earth years',
    rotationPeriod: '16h 6m',
    facts: [
      'Neptune is the last and farthest major planet in the Solar System.',
      'It is made of thick ice particles, water, ammonia, and methane, which creates its vivid, bright cobalt blue color.',
      'Neptune takes the longest time for a single revolution around the Sun (165 Earth years!).',
      'It is more than 30 times larger than the Earth and is the only planet not visible to the naked eye from Earth.',
      'Harbors the fastest supersonic winds in the solar system, up to 2,100 km/h!'
    ],
    bengaliFacts: [
      'নেপচুন সূর্য থেকে সৌরজগতের সবচেয়ে দূরবর্তী এবং শেষ প্রধান গ্রহ।',
      'এটি পানি, অ্যামোনিয়া ও মিথেন বরফে তৈরি, যা একে গাঢ় ও উজ্জ্বল নীল বর্ণ দান করে।',
      'সূর্যকে একবার প্রদক্ষিণ করতে এর প্রায় ১৬৫ পৃথিবী-বছর সময় লাগে!',
      'এটি পৃথিবীর চেয়ে ৩০ গুণেরও বেশি বিশাল এবং খালি চোখে পৃথিবী থেকে দেখা যায় না।',
      'এখানে ঘণ্টায় ২১০০ কিমি বেগে সৌরজগতের দ্রুততম সাইক্লোন ঝড় বয়ে যায়!'
    ]
  }
];

const MISSIONS_DATA = [
  {
    id: 1,
    act: 1,
    actName: 'ACT 1 — TRAINING',
    actBengali: 'অ্যাক্ট ১ — প্রশিক্ষণ',
    title: 'FIRST LAUNCH',
    titleBengali: 'প্রথম উৎক্ষেপণ',
    difficulty: 1,
    destination: 'Earth Low Orbit (300 km)',
    destinationBengali: 'পৃথিবীর নিম্ন কক্ষপথ (৩০০ কিমি)',
    targetPlanetId: 'earth',
    recommendedCargo: { food: 150, water: 150, fuel: 500, scienceKit: 50, oxygen: 150 },
    maxCargoCapacity: 1000,
    objective: 'Launch spacecraft safely from Earth launchpad and achieve stable target orbit.',
    objectiveBengali: 'প্রথমবার spacecraft launch করে নির্দিষ্ট orbit-এ পৌঁছানো। Player এখানে basic controls শিখবে।',
    tasks: [
      { id: 'engine_start', text: 'Start Capsule Ion Thruster', textBn: 'ইঞ্জিন চালু করুন' },
      { id: 'launch', text: 'Liftoff and achieve escape velocity', textBn: 'উৎক্ষেপণ এবং উড্ডয়ন বেগ অর্জন' },
      { id: 'trajectory', text: 'Maintain gravity turn trajectory', textBn: 'সঠিক কক্ষপথের দিক বজায় রাখুন' },
      { id: 'reach_orbit', text: 'Circularize into target orbit (300 km)', textBn: 'নির্দিষ্ট কক্ষপথে সফলভাবে পৌঁছানো' }
    ],
    risk: 'Engine flameout or overheating if thrust is maintained at redline.',
    riskBengali: 'অতিরিক্ত থ্রোটল দিলে ইঞ্জিন অতিরিক্ত গরম বা বিস্ফোরিত হতে পারে।',
    purpose: 'Familiarize player with rocket flight controls, throttle, gimbal, and resource monitoring.',
    purposeBengali: 'Player-কে game-এর controls এবং resource system-এর সাথে পরিচয় করানো।',
    mechanic: 'launch'
  },
  {
    id: 2,
    act: 1,
    actName: 'ACT 1 — TRAINING',
    actBengali: 'অ্যাক্ট ১ — প্রশিক্ষণ',
    title: 'LUNAR LANDING',
    titleBengali: 'চন্দ্র অবতরণ',
    difficulty: 2,
    destination: 'Moon (Mare Tranquillitatis)',
    destinationBengali: 'চাঁদের শান্ত সাগর উপত্যকা',
    targetPlanetId: 'earth',
    recommendedCargo: { food: 200, water: 200, fuel: 600, scienceKit: 100, oxygen: 200 },
    maxCargoCapacity: 1200,
    objective: 'Safely land the spacecraft on designated lunar landing zone without exceeding 3 m/s descent velocity.',
    objectiveBengali: 'Moon-এর নির্দিষ্ট location-এ safely land করা। ল্যান্ডিং গতি নিয়ন্ত্রণ অত্যন্ত জরুরি।',
    tasks: [
      { id: 'lunar_orbit', text: 'De-orbit burn and enter descent trajectory', textBn: 'চন্দ্র অবতরণ গতিপথে প্রবেশ' },
      { id: 'control_speed', text: 'Control descent velocity (< 3.0 m/s)', textBn: 'অবতরণ গতিবেগ নিয়ন্ত্রণ (< ৩.০ মি/সে)' },
      { id: 'avoid_terrain', text: 'Align landing gear and avoid crater rim', textBn: 'বিপজ্জনক গর্ত এড়িয়ে সমতলে অবতরণ' },
      { id: 'touchdown', text: 'Smooth touchdown on target pad', textBn: 'নিরাপদে সফল ল্যান্ডিং সম্পন্ন' }
    ],
    risk: 'High landing velocity will compromise hull integrity and crush landing struts.',
    riskBengali: 'Landing speed বেশি হলে spacecraft damage হতে পারে।',
    purpose: 'Master retro-thruster physics and gravity deceleration in low lunar gravity (1.62 m/s²).',
    purposeBengali: 'চাঁদের মহাকর্ষে রেট্রো-থ্রাস্টার নিয়ন্ত্রণ শেখা।',
    mechanic: 'landing'
  },
  {
    id: 3,
    act: 2,
    actName: 'ACT 2 — EXPLORATION',
    actBengali: 'অ্যাক্ট ২ — অভিযান',
    title: 'SAMPLE HUNT',
    titleBengali: 'নমুনা সংগ্রহ',
    difficulty: 3,
    destination: 'Lunar Highlands (Descartes)',
    destinationBengali: 'চাঁদের উচ্চভূমি এলাকা',
    targetPlanetId: 'earth',
    recommendedCargo: { food: 200, water: 200, fuel: 500, scienceKit: 250, oxygen: 250 },
    maxCargoCapacity: 1200,
    objective: 'Deploy exploration rover / Nimbus scanner to collect 5 rare scientific mineral samples across the rough lunar surface.',
    objectiveBengali: 'একটি planetary surface থেকে নির্দিষ্ট সংখ্যক scientific samples সংগ্রহ করা।',
    tasks: [
      { id: 'deploy_rover', text: 'Deploy Capsule Corp exploration rover', textBn: 'রোভার/স্ক্যানার মাঠে নামান' },
      { id: 'find_samples', text: 'Scan seismic & mineral anomalies', textBn: 'খনিজ নমুনা শনাক্ত করুন' },
      { id: 'collect_5', text: 'Collect 5 high-grade geological samples', textBn: '৫টি বৈজ্ঞানিক নমুনা সংগ্রহ করুন' },
      { id: 'return_ship', text: 'Return safely to lander module with cargo', textBn: 'মালামালসহ নভোযানে ফিরে আসুন' }
    ],
    risk: 'Each sample adds 40 kg mass. More cargo weight increases fuel consumption during ascent!',
    riskBengali: 'রোভার চালালে Energy হ্রাস পাবে; Sample বেশি নিলে Cargo Weight বৃদ্ধি ও জ্বালানি খরচ বাড়বে।',
    purpose: 'Teach cargo vs fuel consumption tradeoff and surface expedition navigation.',
    purposeBengali: 'মালামালের ওজন ও জ্বালানির ভারসাম্য বজায় রাখার কৌশল শেখা।',
    mechanic: 'surface_rover'
  },
  {
    id: 4,
    act: 2,
    actName: 'ACT 2 — EXPLORATION',
    actBengali: 'অ্যাক্ট ২ — অভিযান',
    title: 'SATELLITE RESCUE',
    titleBengali: 'উপগ্রহ মেরামত',
    difficulty: 3,
    destination: 'Lagrange Point 1 Orbit',
    destinationBengali: 'ল্যাগ্রাঞ্জ পয়েন্ট ১ কক্ষপথ',
    targetPlanetId: 'venus',
    recommendedCargo: { food: 250, water: 200, fuel: 600, scienceKit: 300, oxygen: 300 },
    maxCargoCapacity: 1300,
    objective: 'Conduct extra-vehicular activity (EVA Spacewalk) to repair damaged deep-space relay satellite before solar radiation storm arrives.',
    objectiveBengali: 'একটি damaged satellite repair করা। সোলার রেডিয়েশন বৃদ্ধির আগেই মেরামত সম্পন্ন করতে হবে।',
    tasks: [
      { id: 'eva_exit', text: 'Don spacesuit and exit airlock tether', textBn: 'স্পেসওয়াক স্যুট পরে এয়ারলকে বের হন' },
      { id: 'repair_power', text: 'Reroute auxiliary power solar array', textBn: 'সোলার পাওয়ার সংযোগ মেরামত করুন' },
      { id: 'fix_comms', text: 'Align high-gain communication dish', textBn: 'যোগাযোগ অ্যান্টেনা সারিবদ্ধ করুন' },
      { id: 'calibrate_nav', text: 'Calibrate quantum gyro navigation', textBn: 'নেভিগেশন সিস্টেম পুনরায় চালু করুন' }
    ],
    risk: 'Solar radiation wave incoming within limited time. Exposure damages crew health!',
    riskBengali: '⚠️ Solar radiation increases. Player-এর কাছে limited time থাকবে।',
    purpose: 'Test timing, precision Spacewalk maneuvering, and EVA oxygen consumption.',
    purposeBengali: 'সীমিত সময়ের মধ্যে স্পেসওয়াক ও নিখুঁত সার্কিট মেরামত সম্পন্ন করা।',
    mechanic: 'satellite_eva'
  },
  {
    id: 5,
    act: 2,
    actName: 'ACT 2 — EXPLORATION',
    actBengali: 'অ্যাক্ট ২ — অভিযান',
    title: 'CREW SURVIVAL',
    titleBengali: 'জীবন রক্ষা ও সংকট',
    difficulty: 4,
    destination: 'Interplanetary Transit (Earth-Mars corridor)',
    destinationBengali: 'পৃথিবী-মঙ্গল আন্তঃগ্রহ করিডোর',
    targetPlanetId: 'mars',
    recommendedCargo: { food: 350, water: 300, fuel: 600, scienceKit: 150, oxygen: 400 },
    maxCargoCapacity: 1400,
    objective: 'Survive an unexpected micro-meteoroid hull breach that damaged life support, power generator, and food rations.',
    objectiveBengali: 'একটি unexpected emergency-এর পর crew-কে alive রাখা এবং spacecraft repair করা।',
    tasks: [
      { id: 'seal_o2', text: 'Triage and patch life-support oxygen leak', textBn: 'অক্সিজেন লিক মেরামত ও সিল করা' },
      { id: 'stabilize_power', text: 'Reroute reactor coolant to prevent blackout', textBn: 'বিদ্যুৎ ব্যবস্থা পুনরুদ্ধার করা' },
      { id: 'protect_food', text: 'Secure contaminated food & water pantry', textBn: 'খাদ্য ও পানীয় ভাণ্ডার সুরক্ষিত রাখা' },
      { id: 'revive_crew', text: 'Administer medical treatment / Senzu bean', textBn: 'ক্রুর স্বাস্থ্য পুনরুদ্ধার করা' }
    ],
    risk: 'Repairing Oxygen keeps crew alive but leaves power low; repairing power first continues O2 depletion!',
    riskBengali: 'সিদ্ধান্ত সংকট: কোন সিস্টেম আগে মেরামত করবেন? ভুল সিদ্ধান্তে ক্রুর মারাত্মক ক্ষতি হবে।',
    purpose: 'Critical triage and resource allocation under crisis conditions.',
    purposeBengali: 'চরম জরুরি পরিস্থিতিতে সঠিক অগ্রাধিকার ও সিদ্ধান্ত গ্রহণের ক্ষমতা যাচাই।',
    mechanic: 'crisis_triage'
  },
  {
    id: 6,
    act: 3,
    actName: 'ACT 3 — SURVIVAL',
    actBengali: 'অ্যাক্ট ৩ — সংগ্রাম ও সহনশীলতা',
    title: 'ASTEROID FIELD',
    titleBengali: 'গ্রহাণু বলয়',
    difficulty: 4,
    destination: 'Main Asteroid Belt (2.7 AU)',
    destinationBengali: 'প্রধান গ্রহাণু বলয় (মঙ্গল ও বৃহস্পতির মাঝে)',
    targetPlanetId: 'jupiter',
    recommendedCargo: { food: 300, water: 250, fuel: 700, scienceKit: 200, oxygen: 350 },
    maxCargoCapacity: 1500,
    objective: 'Navigate through the dense, high-velocity asteroid belt to reach Jupiter orbit without catastrophic collision.',
    objectiveBengali: 'একটি dangerous asteroid field অতিক্রম করে destination-এ পৌঁছানো।',
    tasks: [
      { id: 'route_choice', text: 'Select Safe Detour vs Risky Direct Route', textBn: 'নিরাপদ নাকি ঝুঁকিপূর্ণ রুট নির্বাচন' },
      { id: 'evade_rocks', text: 'Maneuver and evade high-speed space rocks', textBn: 'ছুটে আসা গ্রহাণু এড়িয়ে চলুন' },
      { id: 'shield_integrity', text: 'Maintain hull shield integrity above 40%', textBn: 'জাহাজের বর্ম অক্ষত রাখুন' },
      { id: 'reach_belt_exit', text: 'Emerge safely into Jupiter orbital transfer', textBn: 'বলয় পার হয়ে নিরাপদ কক্ষপথে প্রবেশ' }
    ],
    risk: 'Asteroid collisions inflict massive hull damage, fuel tank leaks, and navigation thruster failure.',
    riskBengali: 'সংঘর্ষ হলে: Hull damage, Fuel loss, Equipment damage। Safe Route = বেশি জ্বালানি; Risky Route = বেশি সংঘর্ষের ঝুঁকি।',
    purpose: 'Real-time obstacle evasion and tactical route risk assessment.',
    purposeBengali: 'দ্রুত রিফ্লেক্স এবং গতিশীল দিক পরিবর্তনের দক্ষতা যাচাই।',
    mechanic: 'asteroid_dodge'
  },
  {
    id: 7,
    act: 3,
    actName: 'ACT 3 — SURVIVAL',
    actBengali: 'অ্যাক্ট ৩ — সংগ্রাম ও সহনশীলতা',
    title: 'MARS EXPEDITION',
    titleBengali: 'মঙ্গল অভিযান',
    difficulty: 4,
    destination: 'Mars (Olympus Mons Caldera)',
    destinationBengali: 'মঙ্গল গ্রহ (অলিম্পাস মনস)',
    targetPlanetId: 'mars',
    recommendedCargo: { food: 350, water: 300, fuel: 800, scienceKit: 350, oxygen: 400 },
    maxCargoCapacity: 1600,
    objective: 'Enter Mars orbit, penetrate thin CO2 atmosphere with heat shield, deploy rover, and drill ancient sub-surface ice samples.',
    objectiveBengali: 'Mars-এ land করে rover deploy করা এবং scientific data সংগ্রহ করা।',
    tasks: [
      { id: 'mars_orbit', text: 'Mars orbital insertion and atmospheric braking', textBn: 'মঙ্গলের কক্ষপথে প্রবেশ ও বায়ুমণ্ডলীয় ব্রেকিং' },
      { id: 'mars_land', text: 'Safe touchdown on red plains of Chryse', textBn: 'মঙ্গলের পৃষ্ঠে নিরাপদ অবতরণ' },
      { id: 'mars_rover', text: 'Deploy exploration rover in dust storm', textBn: 'ধূলিঝড়ের মাঝে রোভার নামান' },
      { id: 'drill_samples', text: 'Drill 4 deep geological core samples', textBn: 'গভীর মাটির ৪টি বৈজ্ঞানিক নমুনা সংগ্রহ' },
      { id: 'ascent_dock', text: 'Ascend and rendezvous with star cruiser', textBn: 'মহাকাশযানে সফল প্রত্যাবর্তন' }
    ],
    risk: 'Severe dust storms increase power consumption. 14-minute communication delay with Earth elevates crew stress!',
    riskBengali: 'Power consumption বৃদ্ধি, Communication delay বৃদ্ধি এবং Crew stress বৃদ্ধি পাবে।',
    purpose: 'Complex interplanetary exploration with environment hazards and delayed telemetry.',
    purposeBengali: 'প্রতিকূল ভিনগ্রহে বৈজ্ঞানিক গবেষণা ও শক্তি ব্যবস্থাপনার সমন্বয়।',
    mechanic: 'mars_mission'
  },
  {
    id: 8,
    act: 3,
    actName: 'ACT 3 — SURVIVAL',
    actBengali: 'অ্যাক্ট ৩ — সংগ্রাম ও সহনশীলতা',
    title: 'THE LOST DATA',
    titleBengali: 'হারানো ডেটা উদ্ধার',
    difficulty: 4,
    destination: 'Abandoned Research Outpost (Near Saturn)',
    destinationBengali: 'পরিত্যক্ত বৈজ্ঞানিক স্টেশন (শনির বলয়ের কাছে)',
    targetPlanetId: 'saturn',
    recommendedCargo: { food: 400, water: 350, fuel: 850, scienceKit: 400, oxygen: 450 },
    maxCargoCapacity: 1700,
    objective: 'Dock with a silent research station orbiting Saturn, reboot mainframe servers, and extract critical hyperdrive research data.',
    objectiveBengali: 'একটি abandoned research station থেকে গুরুত্বপূর্ণ scientific data উদ্ধার করা।',
    tasks: [
      { id: 'dock_station', text: 'Manual precision docking with airlock port', textBn: 'পরিত্যক্ত স্টেশনে সঠিক ডকিং' },
      { id: 'reroute_power', text: 'Reroute reactor coils to power server room', textBn: 'কম্পিউটার রুমে বিদ্যুৎ সঞ্চালন' },
      { id: 'decode_data', text: 'Decrypt corrupted quantum hard drives (100%)', textBn: 'হারানো বৈজ্ঞানিক ডেটা ডিক্রিপ্ট ও ডাউনলোড' },
      { id: 'evacuate_station', text: 'Evacuate before orbital decay collapse', textBn: 'স্টেশন ধ্বংসের পূর্বে নিরাপদে বের হওয়া' }
    ],
    risk: 'Retrieving extra heavy physical equipment gives massive XP bonus, but extra weight increases return fuel consumption exponentially!',
    riskBengali: 'Data সংগ্রহ করবে নাকি Extra equipment নিয়ে safe থাকবে? More weight = More fuel consumption।',
    purpose: 'Puzzle decryption and strategic weight vs reward decision.',
    purposeBengali: 'লজিক পাজল সমাধান এবং ঝুঁকি বনাম বৈজ্ঞানিক অর্জনের ভারসাম্য।',
    mechanic: 'station_dock_hack'
  },
  {
    id: 9,
    act: 4,
    actName: 'ACT 4 — DEEP SPACE',
    actBengali: 'অ্যাক্ট ৪ — গভীর মহাকাশ',
    title: 'DEEP SPACE',
    titleBengali: 'গভীর মহাকাশ',
    difficulty: 5,
    destination: 'Outer Gas Giant Corridor (Uranus & Neptune)',
    destinationBengali: 'ইউরেনাস ও নেপচুনের বরফ বলয়',
    targetPlanetId: 'neptune',
    recommendedCargo: { food: 450, water: 400, fuel: 950, scienceKit: 300, oxygen: 500 },
    maxCargoCapacity: 1800,
    objective: 'Voyage to the outermost edge of our solar system (4.5 Billion km from the Sun), where light is dim and temperatures hit -225°C.',
    objectiveBengali: 'Earth থেকে অনেক দূরের একটি location-এ পৌঁছে mission complete করে ফিরে আসা। প্রায় সব resource limited থাকবে।',
    tasks: [
      { id: 'gravity_assist', text: 'Perform gravity slingshot around Jupiter', textBn: 'বৃহস্পতির মহাকর্ষীয় সুইং-বাই স্লিংগশট' },
      { id: 'thermal_control', text: 'Maintain cryo-reactor heat at -225°C', textBn: 'চরম ঠান্ডায় থার্মাল হিটার নিয়ন্ত্রণ' },
      { id: 'deep_scan', text: 'Complete supersonic wind & magnetic scans', textBn: 'নেপচুনের তীব্র নীল বায়ুমণ্ডল স্ক্যান' },
      { id: 'plot_return', text: 'Initiate trans-planetary return burn', textBn: 'পৃথিবীর দিকে ফিরতি ট্র্যাজেক্টরি সেট' }
    ],
    risk: 'Extreme isolation causes crew fatigue, cryogenic battery drain, and near-zero solar recharge power.',
    riskBengali: 'Low fuel, Low oxygen, Power shortage, Crew fatigue এবং Communication delay। আগের মিশনের দক্ষতা এখানে জীবন বাঁচাবে।',
    purpose: 'Orbital gravity mechanics, deep cryogenic power management, and extreme survival endurance.',
    purposeBengali: 'মহাকর্ষীয় স্লিংগশট মেকানিক্স এবং গভীর মহাকাশের চরম একাকীত্বে টিকে থাকা।',
    mechanic: 'deep_slingshot'
  },
  {
    id: 10,
    act: 5,
    actName: 'FINAL ACT — THE CLIMAX',
    actBengali: 'চূড়ান্ত অধ্যায় — ঘরে ফেরার অন্তিম যাত্রা',
    title: 'THE FINAL RETURN',
    titleBengali: 'ঘরে ফেরার অন্তিম যাত্রা',
    difficulty: 5,
    destination: 'Earth Atmospheric Entry & Landing',
    destinationBengali: 'পৃথিবীর বায়ুমণ্ডলে পুনঃপ্রবেশ ও অবতরণ',
    targetPlanetId: 'earth',
    recommendedCargo: { food: 300, water: 300, fuel: 800, scienceKit: 500, oxygen: 400 },
    maxCargoCapacity: 2000,
    objective: 'The climactic final gauntlet: Spacecraft crippled with multiple emergencies during high-velocity Earth approach. Resolve all crises, survive atmospheric inferno, and land safely!',
    objectiveBengali: '🚨 Player mission objective complete করে Earth-এর দিকে ফিরে আসছে। কিন্তু ফেরার পথে একসাথে একাধিক critical problem তৈরি হবে!',
    tasks: [
      { id: 'fix_fuel_leak', text: 'Patch emergency fuel leak valve', textBn: 'জ্বালানি লিকেজ অবিলম্বে বন্ধ করুন' },
      { id: 'restore_comms', text: 'Realign high-gain antenna to Mission Control', textBn: 'নিয়ন্ত্রণ কক্ষের সাথে যোগাযোগ পুনঃস্থাপন' },
      { id: 'counter_storm', text: 'Raise ion deflector against solar flare', textBn: 'সৌর ঝড়ের বিরুদ্ধে এনার্জি শিল্ড সক্রিয় করুন' },
      { id: 'stabilize_life', text: 'Stabilize oxygen level and battery voltage', textBn: 'অক্সিজেন ও পাওয়ার সিস্টেম স্থিতিশীল করুন' },
      { id: 'reentry_corridor', text: 'Hold entry angle corridor (32° - 36°)', textBn: 'বায়ুমণ্ডলে প্রবেশের সঠিক কোণ বজায় রাখুন' },
      { id: 'final_touchdown', text: 'Deploy parachutes and touchdown safely on Earth', textBn: 'প্যারাশুট খুলে পৃথিবীতে চূড়ান্ত সফল অবতরণ' }
    ],
    risk: 'Wrong entry angle means bouncing into deep void or vaporizing in hypersonic friction heat!',
    riskBengali: 'একসাথে ৫টি মহাবিপদ: Fuel leak, Communication lost, Solar storm, Oxygen falling, Power unstable!',
    purpose: 'The ultimate synthesis of all skills learned: emergency triage, piloting precision, and courage.',
    purposeBengali: 'সমস্ত অর্জিত দক্ষতার চূড়ান্ত পরীক্ষা দিয়ে বীরের বেশে ঘরে ফিরে আসা।',
    mechanic: 'final_reentry'
  }
];

const GOKU_DIALOGUES = {
  welcome: {
    en: "Yo! I'm Son Goku! Together with Capsule Corp and NASA, we're heading to the deepest reaches of the Solar System! Let's train hard and bring everyone back safely!",
    bn: "ইয়ো! আমি সন গোকু! ক্যাপসুল কর্প ও স্পেস টিমের সাথে আমরা সৌরজগতের অসীম রহস্যের খোঁজে যাচ্ছি! চলো একসাথে মহাকাশ জয়ের অভিযানে নামি!"
  },
  mission1_start: {
    en: "Hold on tight! Flying Nimbus engine throttle is spooling up. Keep our pitch angled smoothly towards orbit!",
    bn: "সবাই শক্ত হয়ে বসো! আমাদের নভোযানের আয়ন ইঞ্জিন গর্জে উঠছে। কক্ষপথের দিকে সাবধানে স্টিয়ারিং রাখো!"
  },
  mission2_landing: {
    en: "The Moon's gravity is light, but if we drop faster than 3 m/s, we'll smash our landing struts! Fire retro-thrusters carefully!",
    bn: "চাঁদের অভিকর্ষ কম হলেও ৩ মি/সেকেন্ডের বেশি গতিতে নামলে ক্র্যাশ করব! রেট্রো-থ্রাস্টার ধীরে ধীরে চালাও!"
  },
  mission3_rover: {
    en: "Whoa, look at those glowing crystals! But remember, Bulma said too much cargo will make us burn all our fuel!",
    bn: "বাহ্! কী চমৎকার মহাজাগতিক পাথর! তবে মনে রেখো, অতিরিক্ত ভারী মালামাল তুললে ফেরার জ্বালানি ফুরিয়ে যাবে!"
  },
  mission4_eva: {
    en: "Heading out into open vacuum! A solar flare is heading right at us, so let's fix this satellite quick!",
    bn: "আমি স্পেসওয়াক করছি! সৌর বিকিরণের তীব্র ঝড় আসছে, তার আগেই আমাদের এই উপগ্রহ মেরামত করতে হবে!"
  },
  mission5_crisis: {
    en: "Oxygen tank breached?! Stay calm! Saiyans never give up! Quick, prioritize which system to seal first!",
    bn: "অক্সিজেন লিক আর পাওয়ার ক্রাইসিস?! ভয় পেয়ো না! সাইয়ানরা কখনো হার মানে না! আগে জরুরি লিকেজ সিল করো!"
  },
  mission6_asteroids: {
    en: "Giant space rocks tumbling everywhere! Time to show off our high-speed evasive maneuvering!",
    bn: "সামনে বিশাল গ্রহাণুর ঝাঁক! এবার আমাদের দ্রুত পাইলটিং রিফ্লেক্স কাজে লাগানোর সময়!"
  },
  mission7_mars: {
    en: "Mars' red dunes look amazing! The signal delay with Earth is huge, so we have to trust our instincts!",
    bn: "মঙ্গলের লাল বালিয়াড়ি দেখতে দুর্দান্ত! পৃথিবীর সিগন্যাল পেতে দেরি হচ্ছে, আমাদের নিজেদেরই সিদ্ধান্ত নিতে হবে!"
  },
  mission8_station: {
    en: "This abandoned station is creepy and cold... Let's decrypt the data terminals and power up the auxiliary generator!",
    bn: "এই পরিত্যক্ত মহাকাশ স্টেশনটা অদ্ভুত শান্ত... চলো দ্রুত কম্পিউটার ডেটা ডিক্রিপ্ট করে নিই!"
  },
  mission9_deep_space: {
    en: "Brrr! -225°C near Neptune! The Sun is just a distant bright star now. Let's use Jupiter's gravity to fling us forward!",
    bn: "উফ্! নেপচুনের কাছে মাইনাস ২২৫ ডিগ্রি ঠান্ডা! সূর্যটাও দূরে মিলিয়ে গেছে। বৃহস্পতির মহাকর্ষীয় স্লিংগশট ব্যবহার করো!"
  },
  mission10_final: {
    en: "Everything's flashing red! Fuel leak, solar storm, and re-entry heat! We're bringing this ship home no matter what! KAMEHAMEHA POWER!",
    bn: "সব অ্যালার্ম বেজে উঠেছে! কিন্তু আমরা হার মানব না! সবাইকে নিরাপদে ঘরে ফিরিয়ে নিয়ে যাবই! ফুল পাওয়ার শিল্ড অন!"
  },
  mission_success: {
    en: "Haha! We pulled it off! That was awesome teamwork! Ready for the next coordinates!",
    bn: "দারুণ! আমরা সফল হয়েছি! চলো পরবর্তী মিশনের জন্য প্রস্তুতি নিই!"
  },
  mission_fail: {
    en: "Argh! That was tough! Eat a Senzu Bean, calibrate our thrusters, and let's try again with a better strategy!",
    bn: "আহ্! এবার হলো না! তবে মন খারাপ করার কিছু নেই, চলো ভুলগুলো শুধরে নতুন কৌশলে আবার চেষ্টা করি!"
  },
  grand_ending: {
    en: "MISSION ACCOMPLISHED! THE CREW IS HOME! We crossed 4.5 billion kilometers of deep space and returned together safely! You're an incredible Commander!",
    bn: "মিশন সম্পন্ন! আমরা সফলভাবে ঘরে ফিরেছি! ৪.৫ বিলিয়ন কিলোমিটার পাড়ি দিয়ে পৃথিবী মাতার কোলে প্রত্যাবর্তন! তুমি একজন সত্যিকারের মহাকাশ বীর!"
  }
};

const UNEXPECTED_EVENTS_POOL = [
  {
    id: 'solar_flare',
    title: 'Solar Radiation Storm',
    titleBn: 'সৌর বিকিরণ ঝড়',
    desc: 'An intense coronal mass ejection is sweeping across your flight corridor.',
    descBn: 'তীব্র সৌর বিকিরণ নভোযানের দিকে ধেয়ে আসছে।',
    choices: [
      { text: 'Raise Capsule Deflector Shield (-40 Power, Hull Safe)', textBn: 'এনার্জি শিল্ড অন করুন (-৪০ পাওয়ার, বর্ম অক্ষত)', powerCost: 40, hullCost: 0, crewStress: 10 },
      { text: 'Power Down Non-Essentials & Hide Behind Hull (-20 Hull, -15 Crew Health)', textBn: 'সিস্টেম অফ করে বর্মের আড়ালে থাকুন (-২০ বর্ম, -১৫ স্বাস্থ্য)', powerCost: 0, hullCost: 20, crewStress: 30 }
    ]
  },
  {
    id: 'fuel_leak',
    title: 'Emergency Propellant Valve Leak',
    titleBn: 'জ্বালানি লাইনে ছিদ্র',
    desc: 'Cryogenic fuel line micro-fracture detected in RCS thruster manifold.',
    descBn: 'জ্বালানির প্রধান পাইপে মাইক্রো-ফাটল দেখা দিয়েছে।',
    choices: [
      { text: 'Perform Emergency EVA Weld (-30 O2, Fixes Leak, Saves Fuel)', textBn: 'জরুরি স্পেসওয়াক করে লিক সিল করুন (-৩০ O2, জ্বালানি রক্ষা)', o2Cost: 30, fuelLoss: 50, stress: 15 },
      { text: 'Vent Crippled Line (-150 Fuel Loss, Safe for Crew)', textBn: 'ক্ষতিগ্রস্ত লাইন ভেন্ট করে বন্ধ করুন (-১৫০ জ্বালানি ক্ষতি)', o2Cost: 0, fuelLoss: 150, stress: 5 }
    ]
  },
  {
    id: 'comms_jam',
    title: 'Deep Space Ion Noise Interference',
    titleBn: 'যোগাযোগ ব্যবস্থার বিকলতা',
    desc: 'Atmospheric ion storm severed telemetry connection with NASA Mission Control.',
    descBn: 'মহাজাগতিক আয়ন তরঙ্গের কারণে পৃথিবী থেকে সংকেত বিচ্ছিন্ন।',
    choices: [
      { text: 'Overcharge High-Gain Transponder (-35 Power, Restores Comms)', textBn: 'ট্রান্সপন্ডার ওভারচার্জ করুন (-৩৫ পাওয়ার, সংকেত পুনরুদ্ধার)', powerCost: 35, commsRestored: true, stress: 5 },
      { text: 'Proceed on Autonomous Pilot AI (+25 Crew Stress, Low Power Draw)', textBn: 'স্বয়ংক্রিয় এআই দিয়ে চলুন (+২৫ স্ট্রেস, শক্তি সাশ্রয়)', powerCost: 0, commsRestored: false, stress: 25 }
    ]
  },
  {
    id: 'food_contamination',
    title: 'Hydroponics Coolant Failure',
    titleBn: 'খাদ্য ভাণ্ডারের কুল্যান্ট নষ্ট',
    desc: 'Food ration refrigeration circuit overheated; storage temp rising.',
    descBn: 'খাবার সংরক্ষণের কুলার অতিরিক্ত গরম হয়ে বিকল হওয়ার উপক্রম।',
    choices: [
      { text: 'Use Goku Saiyan Ki-Blast to flash-cool coolant loop (-25 Goku Energy)', textBn: 'গোকুর এনার্জি দিয়ে কুলার ঠান্ডা করুন (-২৫ এনার্জি)', gokuEnergyCost: 25, foodSaved: true },
      { text: 'Discard Spoilage Rations (-80 Food Supply)', textBn: 'নষ্ট খাবার ফেলে দিন (-৮০ খাবার ক্ষতি)', foodLoss: 80 }
    ]
  }
];
