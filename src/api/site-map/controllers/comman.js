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

const calculators = [
  { loc: `${baseUrl}/car-value-calculator`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/car-loan-emi-calculator`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `${baseUrl}/rto-information`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
];

const siteMaps = [
  ...highPriority,
  ...calculators,

];

const indexData = siteMaps.map((p) => ({
  loc: p.loc,
  lastmod: p.lastmod,
  changefreq: p.changefreq,
  priority: p.priority,
}));

module.exports = {indexData};
