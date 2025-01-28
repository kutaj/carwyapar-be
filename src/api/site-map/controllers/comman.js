const baseUrl = "https://carwyapar.com";

const date = new Date().toISOString();
const beforeOneDate = new Date();
beforeOneDate.setDate(beforeOneDate.getDate() - 1);
const formattedBeforeOneDate = beforeOneDate.toISOString();

const highPriority = [
  { loc: `/`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `/new-cars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `/sell-your-car`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `/latestcars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `/compare-cars`, changefreq: "hourly", priority: "1", lastmod: date },
  { loc: `/used-cars`, changefreq: "hourly", priority: "1", lastmod: date },
];

const calculators = [
  { loc: `/car-value-calculator`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/car-loan-emi-calculator`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/rto-information`, changefreq: "weekly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/about-us`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/terms-of-use`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/privacy-policy`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/disclaimer`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/cookie-policy`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
  { loc: `/contact-us`, changefreq: "hourly", priority: "0.9", lastmod: formattedBeforeOneDate },
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
