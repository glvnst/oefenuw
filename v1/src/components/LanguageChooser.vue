<template>
  <div class="control has-icons-left">
    <div class="select is-rounded">
      <select v-model="$i18n.locale">
        <option
          v-for="(lang, langCode) in supportedLangs"
          :key="langCode"
          :value="langCode"
          :class="{ rtl: lang.rtl }"
        >
          {{ lang["name"] }}
        </option>
      </select>
    </div>
    <span class="icon is-left">🌍</span>
  </div>
</template>

<script>
// Much of this language data comes from:
// <https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code>
const langs = {
  gv: {
    name: "Gaelg"
  },
  gu: {
    name: "ગુજરાતી"
  },
  scn: {
    name: "Sicilianu"
  },
  tokipona: {
    name: "tokipona"
  },
  cdo: {
    name: "Mìng-dĕ̤ng-ngṳ̄ / 閩東語"
  },
  sco: {
    name: "Scots"
  },
  gd: {
    name: "Gàidhlig"
  },
  ga: {
    name: "Gaeilge"
  },
  gn: {
    name: "Avañe'ẽ"
  },
  gl: {
    name: "Galego"
  },
  als: {
    name: "Alemannisch"
  },
  lg: {
    name: "Luganda"
  },
  hak: {
    name: "客家語/Hak-kâ-ngî"
  },
  lb: {
    name: "Lëtzebuergesch"
  },
  la: {
    name: "Latina"
  },
  ln: {
    name: "Lingála"
  },
  lo: {
    name: "ລາວ / Pha xa lao"
  },
  xmf: {
    name: "მარგალური"
  },
  tr: {
    name: "Türkçe"
  },
  ts: {
    name: "Xitsonga"
  },
  li: {
    name: "Limburgs"
  },
  lv: {
    name: "Latviešu"
  },
  to: {
    name: "Lea Faka-Tonga"
  },
  lt: {
    name: "Lietuvių"
  },
  "zh-yue": {
    name: "粵語 / 粤语"
  },
  pdc: {
    name: "Deitsch"
  },
  khw: {
    name: "کھوار",
    rtl: true
  },
  ti: {
    name: "ትግርኛ"
  },
  tg: {
    name: "Тоҷикӣ"
  },
  te: {
    name: "తెలుగు"
  },
  ksh: {
    name: "Ripoarisch"
  },
  haw: {
    name: "Hawai`i"
  },
  yi: {
    name: "ייִדיש",
    rtl: true
  },
  ty: {
    name: "Reo Mā`ohi"
  },
  udm: {
    name: "Удмурт кыл"
  },
  ceb: {
    name: "Sinugboanong Binisaya"
  },
  yo: {
    name: "Yorùbá"
  },
  de: {
    name: "Deutsch"
  },
  da: {
    name: "Dansk"
  },
  za: {
    name: "Cuengh / Tôô / 壮语"
  },
  ta: {
    name: "தமிழ்"
  },
  bxr: {
    name: "Буряад хэлэн"
  },
  dz: {
    name: "ཇོང་ཁ"
  },
  new: {
    name: "नेपालभाषा / Newah Bhaye"
  },
  dv: {
    name: "ދިވެހިބަސް",
    rtl: true
  },
  qu: {
    name: "Runa Simi"
  },
  vls: {
    name: "West-Vlaoms"
  },
  bar: {
    name: "Boarisch"
  },
  war: {
    name: "Winaray / Binisaya Lineyte-Samarnon"
  },
  gbm: {
    name: "गढ़वळी"
  },
  "fiu-vro": {
    name: "Võro"
  },
  bpy: {
    name: "ইমার ঠার/বিষ্ণুপ্রিয়া মণিপুরী"
  },
  diq: {
    name: "Zazaki"
  },
  el: {
    name: "Ελληνικά"
  },
  eo: {
    name: "Esperanto"
  },
  en: {
    name: "English"
  },
  zh: {
    name: "中文"
  },
  pms: {
    name: "Piemontèis"
  },
  ee: {
    name: "Ɛʋɛ"
  },
  tpi: {
    name: "Tok Pisin"
  },
  rmy: {
    name: "Romani / रोमानी"
  },
  lan: {
    name: "Leb Lango / Luo"
  },
  mh: {
    name: "Kajin Majel / Ebon"
  },
  arc: {
    name: "ܣܘܪܬ",
    rtl: true
  },
  uk: {
    name: "Українська"
  },
  eu: {
    name: "Euskara"
  },
  et: {
    name: "Eesti"
  },
  tet: {
    name: "Tetun"
  },
  es: {
    name: "Español"
  },
  ru: {
    name: "Русский"
  },
  rw: {
    name: "Kinyarwandi"
  },
  mus: {
    name: "Mvskoke"
  },
  rm: {
    name: "Rumantsch"
  },
  si: {
    name: "සිංහල"
  },
  got: {
    name: "gutisk"
  },
  rn: {
    name: "Kirundi"
  },
  ro: {
    name: "Română"
  },
  dsb: {
    name: "Dolnoserbski"
  },
  jv: {
    name: "Basa Jawa"
  },
  be: {
    name: "Беларуская"
  },
  bg: {
    name: "Български"
  },
  ba: {
    name: "Башҡорт"
  },
  wa: {
    name: "Walon"
  },
  ast: {
    name: "Asturianu"
  },
  wo: {
    name: "Wollof"
  },
  bm: {
    name: "Bamanankan"
  },
  bn: {
    name: "বাংলা"
  },
  bo: {
    name: "བོད་ཡིག / Bod skad"
  },
  bh: {
    name: "भोजपुरी"
  },
  bi: {
    name: "Bislama"
  },
  "map-bms": {
    name: "Basa Banyumasan"
  },
  tum: {
    name: "chiTumbuka"
  },
  br: {
    name: "Brezhoneg"
  },
  bs: {
    name: "Bosanski"
  },
  ja: {
    name: "日本語"
  },
  om: {
    name: "Oromoo"
  },
  oj: {
    name: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin"
  },
  ilo: {
    name: "Ilokano"
  },
  "roa-rup": {
    name: "Armâneashti"
  },
  oc: {
    name: "Occitan"
  },
  "be-tarask": {
    name: "Беларуская (тарашкевіца)"
  },
  st: {
    name: "Sesotho"
  },
  tw: {
    name: "Twi"
  },
  nds: {
    name: "Plattdüütsch"
  },
  tlh: {
    name: "tlhIngan-Hol"
  },
  os: {
    name: "Иронау"
  },
  or: {
    name: "ଓଡ଼ିଆ"
  },
  pih: {
    name: "Norfuk"
  },
  xh: {
    name: "isiXhosa"
  },
  ch: {
    name: "Chamoru"
  },
  co: {
    name: "Corsu"
  },
  nso: {
    name: "Sesotho sa Leboa / Sepedi"
  },
  simple: {
    name: "Simple English"
  },
  ca: {
    name: "Català"
  },
  lmo: {
    name: "Lumbaart"
  },
  ce: {
    name: "Нохчийн"
  },
  cy: {
    name: "Cymraeg"
  },
  ang: {
    name: "Englisc"
  },
  vec: {
    name: "Vèneto"
  },
  cs: {
    name: "Česky"
  },
  cr: {
    name: "Nehiyaw"
  },
  "zh-min-nan": {
    name: "Bân-lâm-gú"
  },
  cv: {
    name: "Чăваш"
  },
  cu: {
    name: "словѣньскъ / slověnĭskŭ"
  },
  ve: {
    name: "Tshivenḓa"
  },
  ps: {
    name: "پښتو",
    rtl: true
  },
  pt: {
    name: "Português"
  },
  "zh-tw": {
    name: "‪中文(台灣)‬"
  },
  sm: {
    name: "Gagana Samoa"
  },
  tl: {
    name: "Tagalog"
  },
  cho: {
    name: "Choctaw"
  },
  chr: {
    name: "ᏣᎳᎩ"
  },
  frp: {
    name: "Arpitan / francoprovençal"
  },
  xal: {
    name: "Хальмг"
  },
  "zh-classical": {
    name: "文言"
  },
  vi: {
    name: "Việtnam"
  },
  chy: {
    name: "Tsetsêhestâhese"
  },
  gil: {
    name: "Taetae ni kiribati"
  },
  is: {
    name: "Íslenska"
  },
  pl: {
    name: "Polski"
  },
  tk: {
    name: "Туркмен / تركمن"
  },
  hz: {
    name: "Otsiherero"
  },
  hy: {
    name: "Հայերեն"
  },
  th: {
    name: "ไทย / Phasa Thai"
  },
  nrm: {
    name: "Nouormand / Normaund"
  },
  hr: {
    name: "Hrvatski"
  },
  iu: {
    name: "ᐃᓄᒃᑎᑐᑦ"
  },
  ht: {
    name: "Krèyol ayisyen"
  },
  hu: {
    name: "Magyar"
  },
  gan: {
    name: "贛語"
  },
  "bat-smg": {
    name: "Žemaitėška"
  },
  hi: {
    name: "हिन्दी"
  },
  ho: {
    name: "Hiri Motu"
  },
  ha: {
    name: "هَوُسَ",
    rtl: true
  },
  bug: {
    name: "ᨅᨔ ᨕᨘᨁᨗ / Basa Ugi"
  },
  he: {
    name: "עברית",
    rtl: true
  },
  mg: {
    name: "官話/官话"
  },
  pi: {
    name: "Pāli / पाऴि"
  },
  fur: {
    name: "Furlan"
  },
  sc: {
    name: "Sardu"
  },
  uz: {
    name: "Ўзбек"
  },
  ml: {
    name: "മലയാളം"
  },
  mo: {
    name: "Moldovenească"
  },
  mn: {
    name: "Монгол"
  },
  mi: {
    name: "Māori"
  },
  ik: {
    name: "Iñupiak"
  },
  mk: {
    name: "Македонски"
  },
  ur: {
    name: "اردو",
    rtl: true
  },
  mt: {
    name: "bil-Malti"
  },
  tt: {
    name: "Tatarça"
  },
  ms: {
    name: "Bahasa Melayu"
  },
  mr: {
    name: "मराठी"
  },
  ber: {
    name: "ⵜⴰⵎⴰⵣⵉⵖⵜ / Tamaziɣt"
  },
  ug: {
    name: "Uyƣurqə / ئۇيغۇرچە"
  },
  mwl: {
    name: "Mirandés"
  },
  my: {
    name: "Myanmasa"
  },
  pa: {
    name: "ਪੰਜਾਬੀ / पंजाबी / پنجابي"
  },
  aa: {
    name: "Afar"
  },
  ab: {
    name: "Аҧсуа"
  },
  ss: {
    name: "SiSwati"
  },
  af: {
    name: "Afrikaans"
  },
  tn: {
    name: "Setswana"
  },
  sw: {
    name: "Kiswahili"
  },
  ak: {
    name: "Akana"
  },
  am: {
    name: "አማርኛ"
  },
  it: {
    name: "Italiano"
  },
  an: {
    name: "Aragonés"
  },
  ii: {
    name: "ꆇꉙ / 四川彝语"
  },
  ia: {
    name: "Interlingua"
  },
  as: {
    name: "অসমীয়া"
  },
  ar: {
    name: "العربية",
    rtl: true
  },
  inh: {
    name: "ГӀалгӀай"
  },
  su: {
    name: "Basa Sunda"
  },
  io: {
    name: "Ido"
  },
  av: {
    name: "Авар"
  },
  ay: {
    name: "Aymar"
  },
  az: {
    name: "Azərbaycanca / آذربايجان"
  },
  ie: {
    name: "Interlingue"
  },
  id: {
    name: "Bahasa Indonesia"
  },
  ig: {
    name: "Igbo"
  },
  pap: {
    name: "Papiamentu"
  },
  sk: {
    name: "Slovenčina"
  },
  sr: {
    name: "Српски"
  },
  nl: {
    name: "Nederlands"
  },
  nn: {
    name: "Norsk (nynorsk)"
  },
  min: {
    name: "Minangkabau"
  },
  na: {
    name: "Dorerin Naoero"
  },
  nah: {
    name: "Nahuatl"
  },
  nd: {
    name: "Sindebele"
  },
  ne: {
    name: "नेपाली"
  },
  lij: {
    name: "Líguru"
  },
  csb: {
    name: "Kaszëbsczi"
  },
  ny: {
    name: "Chi-Chewa"
  },
  nap: {
    name: "Nnapulitano"
  },
  vo: {
    name: "Volapük"
  },
  "nds-nl": {
    name: "Nedersaksisch"
  },
  pag: {
    name: "Pangasinan"
  },
  zu: {
    name: "isiZulu"
  },
  so: {
    name: "Soomaaliga"
  },
  nr: {
    name: "isiNdebele"
  },
  pam: {
    name: "Kapampangan"
  },
  nv: {
    name: "Diné bizaad"
  },
  sn: {
    name: "chiShona"
  },
  sq: {
    name: "Shqip"
  },
  fr: {
    name: "Français"
  },
  ng: {
    name: "Oshiwambo"
  },
  lad: {
    name: "Dzhudezmo / Djudeo-Espanyol"
  },
  fy: {
    name: "Frysk"
  },
  sv: {
    name: "Svenska"
  },
  fa: {
    name: "فارسی",
    rtl: true
  },
  ff: {
    name: "Fulfulde"
  },
  fi: {
    name: "Suomi"
  },
  fj: {
    name: "Na Vosa Vakaviti"
  },
  "closed-zh-tw": {
    name: "‪中文(台灣)‬"
  },
  sa: {
    name: "संस्कृतम्"
  },
  awa: {
    name: "Awadhi"
  },
  fo: {
    name: "Føroyskt"
  },
  bcl: {
    name: "Bikol Central"
  },
  ka: {
    name: "ქართული"
  },
  kg: {
    name: "KiKongo"
  },
  kk: {
    name: "Қазақша"
  },
  kj: {
    name: "Kuanyama"
  },
  ki: {
    name: "Gĩkũyũ"
  },
  no: {
    name: "Norsk (bokmål / riksmål)"
  },
  ko: {
    name: "한국어"
  },
  kn: {
    name: "ಕನ್ನಡ"
  },
  km: {
    name: "ភាសាខ្មែរ"
  },
  kl: {
    name: "Kalaallisut"
  },
  ks: {
    name: "कश्मीरी / كشميري",
    rtl: true
  },
  kr: {
    name: "Kanuri"
  },
  ext: {
    name: "Estremeñu"
  },
  sh: {
    name: "Srpskohrvatski / Српскохрватски"
  },
  kw: {
    name: "Kernewek"
  },
  kv: {
    name: "Коми"
  },
  ku: {
    name: "Kurdî / كوردی",
    rtl: true
  },
  sl: {
    name: "Slovenščina"
  },
  jbo: {
    name: "Lojban"
  },
  ky: {
    name: "Kırgızca / Кыргызча"
  },
  sg: {
    name: "Sängö"
  },
  nb: {
    name: "Norsk (bokmål)"
  },
  se: {
    name: "Davvisámegiella"
  },
  sd: {
    name: "सिनधि"
  }
};

export default {
  name: "LanguageChooser",
  props: {},
  computed: {
    supportedLangs() {
      return Object.fromEntries(
        this.enabledLanguages.map(x => {
          return [x, langs[x]];
        })
      );
    }
  },
  data() {
    return {
      // fixme: can we derive this from vue-i18n? maybe from the keys of messages?
      enabledLanguages: ["en", "nl"]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rtl {
  direction: rtl;
}
</style>
