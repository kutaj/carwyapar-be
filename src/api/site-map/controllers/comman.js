const baseUrl = "https://carwyapar.com";

const date = new Date().toISOString();
const beforeOneDate = new Date();
beforeOneDate.setDate(beforeOneDate.getDate() - 1);
const formattedBeforeOneDate = beforeOneDate.toISOString();

const highPriority = [
  { loc: `${baseUrl}`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `${baseUrl}/new-cars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `${baseUrl}/sell-your-car`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `${baseUrl}/latestcars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `${baseUrl}/compare-cars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `${baseUrl}/used-cars`, changefreq: "hourly", priority: "1", lastmod: date },
];

const mediumPriority = [
  { loc: `${baseUrl}/compare-cars/maruti-grand-vitara-vs-kia-seltos`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/compare-cars/kia-seltos-vs-hyundai-creta`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/compare-cars/hyundai-verna-vs-honda-city`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/compare-cars/maruti-jimny-vs-mahindra-thar`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/compare-cars/mahindra-thar-vs-force-gurkha`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/compare-cars/bmw-x1-vs-audi-a4`, changefreq: "daily", priority: "0.8", lastmod: formattedBeforeOneDate },
];

const newsSection = [
  { loc: `${baseUrl}/news/india-car-news`, changefreq: "weekly", priority: "0.7", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/news/india-car-news-electric?category=electric-car-news`, changefreq: "weekly", priority: "0.7", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/news/car-reviews`, changefreq: "weekly", priority: "0.7", lastmod: formattedBeforeOneDate },
];

const calculators = [
  { loc: `${baseUrl}/car-value-calculator`, changefreq: "weekly", priority: "0.6", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/car-loan-emi-calculator`, changefreq: "weekly", priority: "0.6", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/rto-information`, changefreq: "weekly", priority: "0.6", lastmod: formattedBeforeOneDate },
];

const siteMaps = [
  ...highPriority,
  ...mediumPriority,
  ...newsSection,
  ...calculators,

];

const indexData = siteMaps.map((p) => ({
  loc: p.loc,
  lastmod: p.lastmod,
  changefreq: p.changefreq,
  priority: p.priority,
}));

module.exports = {indexData};
