export const BASE_SEEDS = [
  { id: 'ssd-01-drt', code: 'ssd-01-drt', name: 'Dirt Seed', description: 'Basic dirt seed' },
  { id: 'ssd-02-stn', code: 'ssd-02-stn', name: 'Stone Seed', description: 'Basic stone seed' },
  { id: 'ssd-03-snd', code: 'ssd-03-snd', name: 'Sand Seed', description: 'Basic sand seed' },
  { id: 'ssd-04-wtr', code: 'ssd-04-wtr', name: 'Water Seed', description: 'Basic water seed' },
  { id: 'ssd-05-seed', code: 'ssd-05-seed', name: 'Generic Plant Seed', description: 'Generic plant seed' },
  { id: 'ssd-06-wood', code: 'ssd-06-wood', name: 'Wood Seed', description: 'Basic wood seed' },
  { id: 'ssd-07-coal', code: 'ssd-07-coal', name: 'Coal Seed', description: 'Basic coal seed' },
  { id: 'ssd-08-ore', code: 'ssd-08-ore', name: 'Metal Ore Seed', description: 'Basic ore seed' },
  { id: 'ssd-09-gls', code: 'ssd-09-gls', name: 'Glass Seed', description: 'Basic glass seed' },
  { id: 'ssd-10-mgc', code: 'ssd-10-mgc', name: 'Magic Dust Seed', description: 'Basic magic seed' }
];

export const BLOCKS_DATA = [
  {
    code: 'hhu-01a3v-0x1a',
    name: 'Dead Block',
    seedID: 'ssd-101-dead',
    extractChance: 60,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-07-coal'],
    spawn: 'nekropolis, mob undead',
    description: 'blok kusam, estetika gelap'
  },
  {
    code: 'hhu-02b7k-9z2m',
    name: 'Dirt (Refined)',
    seedID: 'ssd-102-drif',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-01-drt'],
    spawn: 'permukaan, plains',
    description: 'versi bersih dirt'
  },
  {
    code: 'hhu-03c9p-1q4s',
    name: 'Grass',
    seedID: 'ssd-103-grs',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-05-seed'],
    spawn: 'plains, padang rumput',
    description: 'menumbuhkan tanaman, dekor'
  },
  {
    code: 'hhu-04d2r-2w6t',
    name: 'Mud',
    seedID: 'ssd-104-mud',
    extractChance: 90,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-04-wtr'],
    spawn: 'rawa, sungai',
    description: 'medium untuk jamur'
  },
  {
    code: 'hhu-05e8s-3u7v',
    name: 'Clay',
    seedID: 'ssd-105-clay',
    extractChance: 80,
    hits: 2,
    recipe: ['ssd-01-drt','ssd-04-wtr','ssd-07-coal'],
    spawn: 'sungai, rawa',
    description: 'bahan padat lembut'
  },
  {
    code: 'hhu-06f1m-4n8x',
    name: 'Sandstone',
    seedID: 'ssd-106-sstone',
    extractChance: 75,
    hits: 2,
    recipe: ['ssd-03-snd','ssd-02-stn'],
    spawn: 'desert ruins, cliffs',
    description: 'batu ringan dari pasir'
  },
  {
    code: 'hhu-07g4n-5p0y',
    name: 'Sand (Fine)',
    seedID: 'ssd-107-fsand',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-03-snd'],
    spawn: 'pantai, desert',
    description: 'pasir jernih untuk glass'
  },
  {
    code: 'hhu-08h6o-6r2z',
    name: 'Concrete (Basement)',
    seedID: 'ssd-108-conc',
    extractChance: 60,
    hits: 3,
    recipe: ['ssd-03-snd','ssd-02-stn','ssd-04-wtr'],
    spawn: 'kota tua, pabrik',
    description: 'blok keras untuk jalan'
  },
  {
    code: 'hhu-09i0q-7s3a',
    name: 'Stone (Refined)',
    seedID: 'ssd-109-rstone',
    extractChance: 70,
    hits: 4,
    recipe: ['ssd-02-stn'],
    spawn: 'gua, cliff',
    description: 'batu finishing'
  },
  {
    code: 'hhu-10j2r-8t4b',
    name: 'Cobblestone',
    seedID: 'ssd-110-cobble',
    extractChance: 90,
    hits: 2,
    recipe: ['ssd-02-stn','ssd-07-coal'],
    spawn: 'gua, roads',
    description: 'batu kasar, common material'
  },
  {
    code: 'hhu-11k5s-9u5c',
    name: 'Brick',
    seedID: 'ssd-111-brick',
    extractChance: 80,
    hits: 3,
    recipe: ['ssd-01-drt','ssd-04-wtr','ssd-07-coal'],
    spawn: 'kota tua, furnaces ruins',
    description: 'blok bata merah klasik'
  },
  {
    code: 'hhu-12l7t-0v6d',
    name: 'Obsidian (Glass-Hardened)',
    seedID: 'ssd-112-obs',
    extractChance: 25,
    hits: 8,
    recipe: ['ssd-02-stn','ssd-04-wtr','ssd-10-mgc'],
    spawn: 'lava pools, rare veins',
    description: 'sangat keras, portal material'
  },
  {
    code: 'hhu-13m9u-1w7e',
    name: 'Ice Block',
    seedID: 'ssd-113-ice',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-04-wtr','ssd-10-mgc'],
    spawn: 'tundra, high biomes',
    description: 'licin, bisa melt'
  },
  {
    code: 'hhu-14n1v-2x8f',
    name: 'Snow Block',
    seedID: 'ssd-114-snow',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-04-wtr'],
    spawn: 'snow biome, storms',
    description: 'dekor musim dingin'
  },
  {
    code: 'hhu-15o3w-3y9g',
    name: 'Water Block (Still)',
    seedID: 'ssd-115-waterblk',
    extractChance: 100,
    hits: null,
    recipe: ['ssd-04-wtr'],
    spawn: 'lakes, wells',
    description: 'sumber air (fluid)'
  },
  {
    code: 'hhu-16p5x-4z0h',
    name: 'Waterlogged Dirt',
    seedID: 'ssd-116-wldirt',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-04-wtr'],
    spawn: 'swamp, wetlands',
    description: 'tanah basah, subur'
  },
  {
    code: 'hhu-17q7y-5a1j',
    name: 'Seedling (Tunas)',
    seedID: 'ssd-117-seedling',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-01-drt'],
    spawn: 'forest, sapling drops',
    description: 'tunas muda yang tumbuh jadi pohon'
  },
  {
    code: 'hhu-18r9z-6b2k',
    name: 'Sapling (Pohon Kecil)',
    seedID: 'ssd-118-sapling',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-06-wood','ssd-05-seed'],
    spawn: 'pohon, leaves',
    description: 'bisa jadi pohon bila ditempatkan'
  },
  {
    code: 'hhu-19s0a-7c3l',
    name: 'Tree (Log)',
    seedID: 'ssd-119-log',
    extractChance: 85,
    hits: 3,
    recipe: ['ssd-06-wood'],
    spawn: 'hutan, tree spawns',
    description: 'sumber utama kayu'
  },
  {
    code: 'hhu-20t2b-8d4m',
    name: 'Wood Plank',
    seedID: 'ssd-120-plank',
    extractChance: 90,
    hits: 2,
    recipe: ['ssd-06-wood','ssd-07-coal'],
    spawn: 'desa, lumberyards',
    description: 'material bangunan dasar (tidak crafted)'
  },
  {
    code: 'hhu-21u4c-9e5n',
    name: 'Log (duplicate style)',
    seedID: 'ssd-121-log2',
    extractChance: 85,
    hits: 3,
    recipe: ['ssd-06-wood','ssd-01-drt'],
    spawn: 'ancient forest',
    description: 'variasi log lebih besar'
  },
  {
    code: 'hhu-22v6d-0f6o',
    name: 'Leaf Block',
    seedID: 'ssd-122-leaf',
    extractChance: 60,
    hits: 1,
    recipe: ['ssd-06-wood','ssd-05-seed'],
    spawn: 'canopy, forest',
    description: 'dekor, drop sapling kadang'
  },
  {
    code: 'hhu-23w8e-1g7p',
    name: 'Flower (Bunga)',
    seedID: 'ssd-123-flower',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-05-seed'],
    spawn: 'meadows, gardens',
    description: 'bahan dye & dekor'
  },
  {
    code: 'hhu-24x0f-2h8q',
    name: 'Wheat (Gandum)',
    seedID: 'ssd-124-wheat',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-01-drt','ssd-04-wtr'],
    spawn: 'abandoned farms, fields',
    description: 'pangan, seed banyak drop'
  },
  {
    code: 'hhu-25y2g-3i9r',
    name: 'Corn',
    seedID: 'ssd-125-corn',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-01-drt'],
    spawn: 'farms, merchants',
    description: 'pangan yield tinggi'
  },
  {
    code: 'hhu-26z4h-4j0s',
    name: 'Cactus',
    seedID: 'ssd-126-cactus',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-03-snd','ssd-05-seed'],
    spawn: 'desert, oases',
    description: 'tanaman gurun, menyakitkan jika disentuh'
  },
  {
    code: 'hhu-27a6i-5k1t',
    name: 'Fern',
    seedID: 'ssd-127-fern',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-05-seed'],
    spawn: 'forest floor, caves mouth',
    description: 'dekorasi rendah cahaya'
  },
  {
    code: 'hhu-28b8j-6l2u',
    name: 'Vines',
    seedID: 'ssd-128-vine',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-06-wood','ssd-05-seed'],
    spawn: 'jungle, cliffs',
    description: 'climbable, dekoratif'
  },
  {
    code: 'hhu-29c0k-7m3v',
    name: 'Mushroom (Red)',
    seedID: 'ssd-129-mushr',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-04-wtr','ssd-05-seed','ssd-10-mgc'],
    spawn: 'dark caves, mushroom groves',
    description: 'food, potion ingredient'
  },
  {
    code: 'hhu-30d2l-8n4w',
    name: 'Mushroom (Brown)',
    seedID: 'ssd-130-mushb',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-05-seed'],
    spawn: 'caves, swamp',
    description: 'edible, fermenting'
  },
  {
    code: 'hhu-31e4m-9o5x',
    name: 'Glowshroom',
    seedID: 'ssd-131-glowsh',
    extractChance: 40,
    hits: 1,
    recipe: ['ssd-129-mushr','ssd-10-mgc'],
    spawn: 'deep caves (rare)',
    description: 'memancarkan cahaya'
  },
  {
    code: 'hhu-32f6n-0p6y',
    name: 'Torch (Basic)',
    seedID: 'ssd-132-torch',
    extractChance: 100,
    hits: 1,
    recipe: ['ssd-06-wood','ssd-07-coal'],
    spawn: 'camps, dungeons',
    description: 'sumber cahaya sementara'
  },
  {
    code: 'hhu-33g8o-1q7z',
    name: 'Lantern',
    seedID: 'ssd-133-lantern',
    extractChance: 70,
    hits: 2,
    recipe: ['ssd-09-gls','ssd-07-coal','ssd-06-wood'],
    spawn: 'village streets, trader goods',
    description: 'sumber cahaya tahan weather'
  },
  {
    code: 'hhu-34h0p-2r8a',
    name: 'Lamp (Powered)',
    seedID: 'ssd-134-plamp',
    extractChance: 50,
    hits: 2,
    recipe: ['ssd-09-gls','ssd-08-ore','ssd-07-coal'],
    spawn: 'tech ruins, labs',
    description: 'butuh "power" (in-world system) to aktif, tapi block sendiri diperoleh tanpa crafting'
  },
  {
    code: 'hhu-35i2q-3s9b',
    name: 'Glowstone',
    seedID: 'ssd-135-glowst',
    extractChance: 30,
    hits: 2,
    recipe: ['ssd-10-mgc','ssd-03-snd','ssd-07-coal'],
    spawn: 'biolume caverns, rare nodes',
    description: 'kuat cahaya, fragile'
  },
  {
    code: 'hhu-36j4r-4t0c',
    name: 'Crystal Block',
    seedID: 'ssd-136-crystal',
    extractChance: 20,
    hits: 6,
    recipe: ['ssd-08-ore','ssd-10-mgc'],
    spawn: 'crystal caves, rare deposits',
    description: 'high-value decorative & magic base'
  },
  {
    code: 'hhu-37k6s-5u1d',
    name: 'Copper Ore',
    seedID: 'ssd-137-copper',
    extractChance: 50,
    hits: 3,
    recipe: ['ssd-08-ore','ssd-07-coal'],
    spawn: 'caves, ore veins',
    description: 'metal dasar untuk wiring (in-world stat)'
  },
  {
    code: 'hhu-38l8t-6v2e',
    name: 'Iron Ore',
    seedID: 'ssd-138-iron',
    extractChance: 40,
    hits: 4,
    recipe: ['ssd-08-ore','ssd-07-coal','ssd-10-mgc'],
    spawn: 'caves, mines',
    description: 'staple metal'
  },
  {
    code: 'hhu-39m0u-7w3f',
    name: 'Gold Ore',
    seedID: 'ssd-139-gold',
    extractChance: 25,
    hits: 5,
    recipe: ['ssd-08-ore','ssd-10-mgc'],
    spawn: 'deep caves, riverbeds',
    description: 'jewelry & currency component'
  },
  {
    code: 'hhu-40n2v-8x4g',
    name: 'Platinum Ore',
    seedID: 'ssd-140-plat',
    extractChance: 15,
    hits: 6,
    recipe: ['ssd-08-ore','ssd-10-mgc','ssd-07-coal'],
    spawn: 'rare deposits, boss chests',
    description: 'high-tier metal'
  },
  {
    code: 'hhu-41o4w-9y5h',
    name: 'Diamond Ore',
    seedID: 'ssd-141-diamond',
    extractChance: 10,
    hits: 7,
    recipe: ['ssd-08-ore','ssd-10-mgc','ssd-09-gls'],
    spawn: 'deep mines, rare chests',
    description: 'top-tier gem'
  },
  {
    code: 'hhu-42p6x-0z6i',
    name: 'Ruby Ore',
    seedID: 'ssd-142-ruby',
    extractChance: 12,
    hits: 6,
    recipe: ['ssd-08-ore','ssd-10-mgc'],
    spawn: 'volcanic zones',
    description: 'gem magis merah'
  },
  {
    code: 'hhu-43q8y-1a7j',
    name: 'Sapphire Ore',
    seedID: 'ssd-143-sapphire',
    extractChance: 12,
    hits: 6,
    recipe: ['ssd-08-ore','ssd-09-gls','ssd-10-mgc'],
    spawn: 'underwater caves, blue caverns',
    description: 'gem untuk optics & magic'
  },
  {
    code: 'hhu-44r0z-2b8k',
    name: 'Metal Plate',
    seedID: 'ssd-144-plate',
    extractChance: 50,
    hits: 4,
    recipe: ['ssd-08-ore','ssd-07-coal'],
    spawn: 'factories, ruins',
    description: 'plate untuk machinery (diperoleh langsung)'
  },
  {
    code: 'hhu-45s2a-3c9l',
    name: 'Anvil (block)',
    seedID: 'ssd-145-anvil',
    extractChance: 20,
    hits: 6,
    recipe: ['ssd-144-plate','ssd-07-coal'],
    spawn: 'blacksmiths, ruins',
    description: 'station block (dipakai di world)'
  },
  {
    code: 'hhu-46t4b-4d0m',
    name: 'Furnace (block)',
    seedID: 'ssd-146-furnace',
    extractChance: 35,
    hits: 5,
    recipe: ['ssd-02-stn','ssd-07-coal'],
    spawn: 'ruins, blacksmiths, caves',
    description: 'block smelting—diperoleh sebagai block utuh'
  },
  {
    code: 'hhu-47u6c-5e1n',
    name: 'Brick Oven',
    seedID: 'ssd-147-oven',
    extractChance: 30,
    hits: 4,
    recipe: ['ssd-111-brick','ssd-07-coal'],
    spawn: 'pottery areas',
    description: 'oven komunal (blok)'
  },
  {
    code: 'hhu-48v8d-6f2o',
    name: 'Glass Block',
    seedID: 'ssd-148-glass',
    extractChance: 85,
    hits: 1,
    recipe: ['ssd-03-snd','ssd-09-gls'],
    spawn: 'glassworks, shops',
    description: 'transparan, fragile'
  },
  {
    code: 'hhu-49w0e-7g3p',
    name: 'Stained Glass',
    seedID: 'ssd-149-stain',
    extractChance: 60,
    hits: 1,
    recipe: ['ssd-148-glass','ssd-10-mgc'],
    spawn: 'cathedrals, art quarters',
    description: 'glass berwarna'
  },
  {
    code: 'hhu-50x2f-8h4q',
    name: 'Mirror',
    seedID: 'ssd-150-mirror',
    extractChance: 40,
    hits: 1,
    recipe: ['ssd-148-glass','ssd-144-plate','ssd-10-mgc'],
    spawn: 'manors, rare chests',
    description: 'dekor & puzzle element'
  },
  {
    code: 'hhu-51y4g-9i5r',
    name: 'Glass Pane',
    seedID: 'ssd-151-pane',
    extractChance: 90,
    hits: 1,
    recipe: ['ssd-148-glass'],
    spawn: 'buildings, shops',
    description: 'jendela tipis'
  },
  {
    code: 'hhu-52z6h-0j6s',
    name: 'Clay Pot',
    seedID: 'ssd-152-pot',
    extractChance: 80,
    hits: 1,
    recipe: ['ssd-105-clay'],
    spawn: 'pottery, gardens',
    description: 'pot untuk tanaman (fungsi estetika)'
  },
  {
    code: 'hhu-53a8i-1k7t',
    name: 'Pottery (Vase)',
    seedID: 'ssd-153-vase',
    extractChance: 60,
    hits: 1,
    recipe: ['ssd-152-pot','ssd-123-flower'],
    spawn: 'artisan stalls, rare finds',
    description: 'high-value decor'
  },
  {
    code: 'hhu-54b0j-2l8u',
    name: 'Ceramic Tile',
    seedID: 'ssd-154-tile',
    extractChance: 85,
    hits: 2,
    recipe: ['ssd-105-clay','ssd-07-coal'],
    spawn: 'ruins, temples',
    description: 'tile untuk lantai/walls'
  },
  {
    code: 'hhu-55c2k-3m9v',
    name: 'Shroomsoil',
    seedID: 'ssd-155-shroom',
    extractChance: 70,
    hits: 1,
    recipe: ['ssd-104-mud','ssd-10-mgc'],
    spawn: 'mushroom groves, caves',
    description: 'tanah khusus untuk jamur bioluminescent'
  },
  {
    code: 'hhu-56d4l-4n0w',
    name: 'Compost',
    seedID: 'ssd-156-compost',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-01-drt','ssd-05-seed'],
    spawn: 'farms, compost heaps',
    description: 'meningkatkan fertility (game mechanic)'
  },
  {
    code: 'hhu-57e6m-5o1x',
    name: 'Fertile Soil',
    seedID: 'ssd-157-fertile',
    extractChance: 90,
    hits: 1,
    recipe: ['ssd-156-compost','ssd-01-drt'],
    spawn: 'farms, enriched patches',
    description: 'mempercepat growth crops'
  },
  {
    code: 'hhu-58f8n-6p2y',
    name: 'Hydro Soil (Wet)',
    seedID: 'ssd-158-hydro',
    extractChance: 80,
    hits: 1,
    recipe: ['ssd-157-fertile','ssd-04-wtr'],
    spawn: 'hydro bays, marshes',
    description: 'growth sangat cepat untuk beberapa crops'
  },
  {
    code: 'hhu-59g0o-7q3z',
    name: 'Hydro Pump (block)',
    seedID: 'ssd-159-pump',
    extractChance: 30,
    hits: 3,
    recipe: ['ssd-144-plate','ssd-04-wtr','ssd-08-ore'],
    spawn: 'farms, ruins',
    description: 'memindahkan air (block machine)'
  },
  {
    code: 'hhu-60h2p-8r4a',
    name: 'Irrigation Pipe (block)',
    seedID: 'ssd-160-pipe',
    extractChance: 60,
    hits: 2,
    recipe: ['ssd-144-plate','ssd-09-gls'],
    spawn: 'greenhouses, farms',
    description: 'channel air (visible block)'
  },
  {
    code: 'hhu-61i4q-9s5b',
    name: 'Water Well (block)',
    seedID: 'ssd-161-well',
    extractChance: 40,
    hits: 4,
    recipe: ['ssd-02-stn','ssd-04-wtr'],
    spawn: 'villages, oases',
    description: 'sumber air lokal (block)'
  },
  {
    code: 'hhu-62j6r-0t6c',
    name: 'Spring (magical)',
    seedID: 'ssd-162-spring',
    extractChance: 15,
    hits: null,
    recipe: ['ssd-04-wtr','ssd-10-mgc'],
    spawn: 'enchanted grottos, rare springs',
    description: 'provides water + small magical effect'
  },
  {
    code: 'hhu-63k8s-1u7d',
    name: 'Vine Fence',
    seedID: 'ssd-163-vinef',
    extractChance: 90,
    hits: 2,
    recipe: ['ssd-128-vine','ssd-120-plank'],
    spawn: 'gardens, jungles',
    description: 'pagar tanaman, climbable'
  },
  {
    code: 'hhu-64l0t-2v8e',
    name: 'Wooden Fence',
    seedID: 'ssd-164-wfence',
    extractChance: 95,
    hits: 2,
    recipe: ['ssd-120-plank'],
    spawn: 'farms, village boundaries',
    description: 'pembatas dasar'
  },
  {
    code: 'hhu-65m2u-3w9f',
    name: 'Stone Wall',
    seedID: 'ssd-165-swall',
    extractChance: 80,
    hits: 4,
    recipe: ['ssd-02-stn','ssd-01-drt'],
    spawn: 'ruins, keeps',
    description: 'tembok kuat'
  },
  {
    code: 'hhu-66n4v-4x0g',
    name: 'Reinforced Wall',
    seedID: 'ssd-166-rwall',
    extractChance: 30,
    hits: 8,
    recipe: ['ssd-165-swall','ssd-144-plate','ssd-10-mgc'],
    spawn: 'fortresses, bunkers',
    description: 'tahan ledakan & mobs'
  },
  {
    code: 'hhu-67o6w-5y1h',
    name: 'Door (Basic)',
    seedID: 'ssd-167-door',
    extractChance: 95,
    hits: 2,
    recipe: ['ssd-120-plank','ssd-144-plate'],
    spawn: 'houses, gates',
    description: 'pintu biasa (blok)'
  },
  {
    code: 'hhu-68p8x-6z2i',
    name: 'Gate (Iron)',
    seedID: 'ssd-168-gate',
    extractChance: 50,
    hits: 4,
    recipe: ['ssd-144-plate','ssd-120-plank'],
    spawn: 'forts, cities',
    description: 'gate lebih kuat'
  },
  {
    code: 'hhu-69q0y-7a3j',
    name: 'Trapdoor',
    seedID: 'ssd-169-trap',
    extractChance: 90,
    hits: 2,
    recipe: ['ssd-120-plank','ssd-144-plate'],
    spawn: 'attics, floors in ruins',
    description: 'hatch floor block'
  },
  {
    code: 'hhu-70r2z-8b4k',
    name: 'Pressure Plate',
    seedID: 'ssd-170-press',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-120-plank','ssd-02-stn','ssd-08-ore'],
    spawn: 'temples, tech ruins',
    description: 'trigger mekanik ketika diinjak'
  },
  {
    code: 'hhu-71s4a-9c5l',
    name: 'Button',
    seedID: 'ssd-171-btn',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-120-plank','ssd-08-ore'],
    spawn: 'buildings, ruins',
    description: 'input singkat (pulse)'
  },
  {
    code: 'hhu-72t6b-0d6m',
    name: 'Switch (Toggle)',
    seedID: 'ssd-172-switch',
    extractChance: 80,
    hits: 1,
    recipe: ['ssd-144-plate','ssd-08-ore'],
    spawn: 'factories, control rooms',
    description: 'toggleable input device'
  },
  {
    code: 'hhu-73u8c-1e7n',
    name: 'Circuit Block (Copper)',
    seedID: 'ssd-173-circuit',
    extractChance: 45,
    hits: 2,
    recipe: ['ssd-137-copper','ssd-144-plate'],
    spawn: 'labs, engineering ruins',
    description: 'dasar elektronika (block)'
  },
  {
    code: 'hhu-74v0d-2f8o',
    name: 'Battery (block)',
    seedID: 'ssd-174-batt',
    extractChance: 30,
    hits: 1,
    recipe: ['ssd-07-coal','ssd-144-plate','ssd-10-mgc'],
    spawn: 'generator rooms, tech chests',
    description: 'penyimpanan tenaga portable (block)'
  },
  {
    code: 'hhu-75w2e-3g9p',
    name: 'Motor (block)',
    seedID: 'ssd-175-motor',
    extractChance: 30,
    hits: 3,
    recipe: ['ssd-144-plate','ssd-174-batt','ssd-137-copper'],
    spawn: 'factories, machinery areas',
    description: 'drive mekanik (block)'
  },
  {
    code: 'hhu-76x4f-4h0q',
    name: 'Conveyor Belt (block)',
    seedID: 'ssd-176-belt',
    extractChance: 60,
    hits: 3,
    recipe: ['ssd-175-motor','ssd-144-plate','ssd-06-wood'],
    spawn: 'factory floors, distribution hubs',
    description: 'menggerakkan item/entitas arah tertentu'
  },
  {
    code: 'hhu-77y6g-5i1r',
    name: 'Portal Frame (block)',
    seedID: 'ssd-177-frame',
    extractChance: 10,
    hits: 7,
    recipe: ['ssd-112-obs','ssd-136-crystal','ssd-10-mgc'],
    spawn: 'ancient sites, boss arenas',
    description: 'frame untuk portal activation (block)'
  },
  {
    code: 'hhu-78z8h-6j2s',
    name: 'Portal (Active)',
    seedID: 'ssd-178-portal',
    extractChance: 5,
    hits: null,
    recipe: ['ssd-177-frame','ssd-10-mgc','ssd-136-crystal'],
    spawn: 'boss arenas, event rewards',
    description: 'teleport aktif — artifact (rare)'
  },
  {
    code: 'hhu-79a0i-7k3t',
    name: 'Beacon',
    seedID: 'ssd-179-beacon',
    extractChance: 20,
    hits: 4,
    recipe: ['ssd-136-crystal','ssd-144-plate','ssd-174-batt'],
    spawn: 'city centers, temples',
    description: 'memberikan buff area kecil'
  },
  {
    code: 'hhu-80b2j-8l4u',
    name: 'Warp Stone (consumable block)',
    seedID: 'ssd-180-warp',
    extractChance: 8,
    hits: null,
    recipe: ['ssd-136-crystal','ssd-10-mgc','ssd-174-batt'],
    spawn: 'boss chests, event',
    description: 'consumable teleport (dipakai sekali)'
  },
  {
    code: 'hhu-81c4k-9m5v',
    name: 'Rune Stone (block)',
    seedID: 'ssd-181-rune',
    extractChance: 25,
    hits: 3,
    recipe: ['ssd-10-mgc','ssd-136-crystal','ssd-02-stn'],
    spawn: 'mage towers, ruins',
    description: 'menyimpan rune/magic effect untuk area'
  },
  {
    code: 'hhu-82d6l-0n6w',
    name: 'Magic Core (block)',
    seedID: 'ssd-182-mcore',
    extractChance: 10,
    hits: 6,
    recipe: ['ssd-136-crystal','ssd-10-mgc','ssd-174-batt'],
    spawn: 'high-magic zones, boss drops',
    description: 'inti untuk alat magis'
  },
  {
    code: 'hhu-83e8m-1o7x',
    name: 'Spellbook (Block)',
    seedID: 'ssd-183-book',
    extractChance: 40,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-10-mgc','ssd-01-drt'],
    spawn: 'libraries, mage vendors',
    description: 'memberikan satu spell ketika digunakan (block)'
  },
  {
    code: 'hhu-84f0n-2p8y',
    name: 'Crystal Tile (Floor)',
    seedID: 'ssd-184-ctile',
    extractChance: 30,
    hits: 3,
    recipe: ['ssd-136-crystal','ssd-02-stn'],
    spawn: 'high-magic mansions, temples',
    description: 'lantai bernilai tinggi, aura kecil'
  },
  {
    code: 'hhu-85g2o-3q9z',
    name: 'Mosaic',
    seedID: 'ssd-185-mosaic',
    extractChance: 60,
    hits: 2,
    recipe: ['ssd-149-stain','ssd-154-tile'],
    spawn: 'palaces, art shops',
    description: 'dekor artistry, tradeable'
  },
  {
    code: 'hhu-86h4p-4r0a',
    name: 'Marble',
    seedID: 'ssd-186-marble',
    extractChance: 50,
    hits: 5,
    recipe: ['ssd-02-stn','ssd-10-mgc'],
    spawn: 'quarries, elite buildings',
    description: 'premium building stone'
  },
  {
    code: 'hhu-87i6q-5s1b',
    name: 'Granite',
    seedID: 'ssd-187-granite',
    extractChance: 80,
    hits: 4,
    recipe: ['ssd-02-stn','ssd-07-coal'],
    spawn: 'mountains, quarries',
    description: 'durable stone'
  },
  {
    code: 'hhu-88j8r-6t2c',
    name: 'Slate',
    seedID: 'ssd-188-slate',
    extractChance: 75,
    hits: 3,
    recipe: ['ssd-02-stn','ssd-01-drt'],
    spawn: 'old towns, quarries',
    description: 'thin roofing tiles'
  },
  {
    code: 'hhu-89k0s-7u3d',
    name: 'Chalk',
    seedID: 'ssd-189-chalk',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-03-snd','ssd-02-stn'],
    spawn: 'cliffs, old schools',
    description: 'powder untuk writing (sign mechanic)'
  },
  {
    code: 'hhu-90l2t-8v4e',
    name: 'Chalkboard (block)',
    seedID: 'ssd-190-board',
    extractChance: 60,
    hits: 2,
    recipe: ['ssd-189-chalk','ssd-120-plank'],
    spawn: 'academies, schools',
    description: 'writeable block for messages'
  },
  {
    code: 'hhu-91m4u-9w5f',
    name: 'Sign',
    seedID: 'ssd-191-sign',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-120-plank','ssd-189-chalk'],
    spawn: 'roads, shops',
    description: 'label block (writeable)'
  },
  {
    code: 'hhu-92n6v-0x6g',
    name: 'Paint (Block)',
    seedID: 'ssd-192-paint',
    extractChance: 80,
    hits: 1,
    recipe: ['ssd-123-flower','ssd-148-glass','ssd-01-drt'],
    spawn: 'artist quarters, stalls',
    description: 'mewarnai adjacent blocks mechanic'
  },
  {
    code: 'hhu-93o8w-1y7h',
    name: 'Canvas',
    seedID: 'ssd-193-canvas',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-120-plank'],
    spawn: 'art stalls, markets',
    description: 'dipakai untuk paint & trade art'
  },
  {
    code: 'hhu-94p0x-2z8i',
    name: 'Banner',
    seedID: 'ssd-194-banner',
    extractChance: 90,
    hits: 1,
    recipe: ['ssd-193-canvas','ssd-192-paint'],
    spawn: 'guild halls, markets',
    description: 'guild flags, decorative'
  },
  {
    code: 'hhu-95q2y-3a9j',
    name: 'Carpet',
    seedID: 'ssd-195-carpet',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-120-plank','ssd-123-flower'],
    spawn: 'homes, textile markets',
    description: 'insulation & decor (reduces cold effects)'
  },
  {
    code: 'hhu-96r4z-4b0k',
    name: 'Rug (Persian)',
    seedID: 'ssd-196-rug',
    extractChance: 40,
    hits: 1,
    recipe: ['ssd-195-carpet','ssd-10-mgc'],
    spawn: 'artisan markets, elite houses',
    description: 'high-value decor'
  },
  {
    code: 'hhu-97s6a-5c1l',
    name: 'Cushion',
    seedID: 'ssd-197-cush',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-05-seed','ssd-195-carpet'],
    spawn: 'furniture shops, homes',
    description: 'seating piece (comfort buff)'
  },
  {
    code: 'hhu-98t8b-6d2m',
    name: 'Bed',
    seedID: 'ssd-198-bed',
    extractChance: 80,
    hits: 2,
    recipe: ['ssd-120-plank','ssd-197-cush','ssd-195-carpet'],
    spawn: 'houses, furniture stores',
    description: 'set spawn & sleep mechanic'
  },
  {
    code: 'hhu-99u0c-7e3n',
    name: 'Chair',
    seedID: 'ssd-199-chair',
    extractChance: 95,
    hits: 1,
    recipe: ['ssd-120-plank','ssd-197-cush'],
    spawn: 'taverns, furniture shops',
    description: 'seating & small comfort buff'
  },
  {
    code: 'hhu-100v2d-8f4o',
    name: 'Workbench (Crafting Table block)',
    seedID: 'ssd-200-workb',
    extractChance: 25,
    hits: 5,
    recipe: ['ssd-120-plank','ssd-144-plate','ssd-173-circuit'],
    spawn: 'builder yards, guild rewards',
    description: 'station block — unlocks higher-tier mixing UI slots'
  }
];

export const SHOP_ITEMS = [
  { id: 'shp-001', name: 'Vanding Machine', priceCoins: 500, priceGems: 10, category: 'block', description: 'mesin vanding buat jualan' },
  { id: 'shp-002', name: 'Lucky Seed Pack (10)', priceCoins: 300, priceGems: 3, category: 'Seeds Pack', description: '10 seed acak (biasanya common)', stackable: true },
  { id: 'shp-003', name: 'Rare Seed Box (1 Guaranteed Rare)', priceCoins: 2500, priceGems: 25, category: 'Seeds Pack', description: 'Satu seed rare terjamin', stackable: false },
  { id: 'shp-004', name: 'Decor Crate (20 blocks)', priceCoins: 400, category: 'Building/Decor', description: '20 decorative blocks acak', tradeable: true },
  { id: 'shp-005', name: 'Magic Dust Pouch x5', priceCoins: 800, priceGems: 8, category: 'Consumable (magic)', description: 'Bahan untuk interaksi seed-langka' },
  { id: 'shp-006', name: 'Beacon (Placeable)', priceCoins: 3000, priceGems: 30, category: 'Utility / Placeable', description: 'Beacon memberikan buff area', limitPerAccount: 2 },
  { id: 'shp-007', name: 'Warp Scroll (Single-Use)', priceCoins: 1200, priceGems: 12, category: 'Consumable / Travel', description: 'Teleport ke saved location sekali pakai', nonTradeable: true },
  { id: 'shp-008', name: 'Extra Mixer Slot (Permanent)', priceCoins: 1800, priceGems: 18, category: 'QoL / Progression', description: 'Tambah 1 slot di Seed Mixer', accountBound: true },
  { id: 'shp-009', name: 'Pet Egg (Common)', priceCoins: 600, priceGems: 6, category: 'Pet', description: 'Telur yang menetas jadi pet common' },
  { id: 'shp-010', name: 'Pet Egg (Rare)', priceCoins: 2500, priceGems: 25, category: 'Pet', description: 'Telur yang menetas jadi pet rare', limitedStock: true },
  { id: 'shp-011', name: 'Banner Pack (4 designs)', priceCoins: 350, category: 'Decor', description: 'Set banner untuk guild / room' },
  { id: 'shp-012', name: 'Furniture Bundle (Chair+Bed+Cushion)', priceCoins: 900, category: 'Furniture', description: 'Paket furniture kecil' },
  { id: 'shp-013', name: 'Coin Bundle (5.000 Coins)', priceGems: 45, category: 'Currency Pack', description: 'Tukar Gems jadi Coins cepat' },
  { id: 'shp-014', name: 'Custom Title Token', priceGems: 20, category: 'Cosmetic / Social', description: 'Ubah title yang tampil di atas nama', accountBound: true },
  { id: 'shp-015', name: 'Emote Block (Chat Emote Block)', priceCoins: 800, category: 'Social / Decor', description: 'Letakkan block yang memancarkan emote chat grafis' },
  { id: 'shp-016', name: 'Seed Analyzer (Tool)', priceCoins: 1200, priceGems: 12, category: 'Tool / Utility', description: 'Menunjukkan kemungkinan resep & rarity' },
  { id: 'shp-017', name: 'Harvest Booster (1 hour, x2 yield)', priceCoins: 700, priceGems: 7, category: 'Boost', description: 'Panen memberikan 2x seed selama 1 jam' },
  { id: 'shp-018', name: 'Extractor Gloves (24h, +20% extract chance)', priceCoins: 1000, priceGems: 10, category: 'Boost / Tool', description: 'Meningkatkan chance ekstraksi seed selama 24 jam' },
  { id: 'shp-019', name: 'Builder Palette (Change Color)', priceCoins: 1500, category: 'Building / QoL', description: 'Ubah warna block yang ditempatkan' }
];
