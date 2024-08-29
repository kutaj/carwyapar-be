const determineChangefreq = (updatedAt) => {
  const now = new Date();
  const updatedDate = new Date(updatedAt);
  const diffInDays =
    (new Date(now).getTime() - new Date(updatedDate).getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffInDays <= 1) {
    return "hourly";
  } else if (diffInDays <= 7) {
    return "daily";
  } else if (diffInDays <= 30) {
    return "weekly";
  } else if (diffInDays <= 365) {
    return "monthly";
  } else {
    return "yearly";
  }
};

const determinePriority = (rowIndex, totalRows) => {
  // Priority range from 0.0 to 1.0
  const maxPriority = 1.0;
  const minPriority = 0.1;

  // Calculate priority as a function of rowIndex and totalRows
  const priorityRange = maxPriority - minPriority;
  const priority = maxPriority - (rowIndex - 1) / (totalRows - 1) * priorityRange;
  const clampedPriority = Math.max(minPriority, Math.min(maxPriority, priority));
  // Ensure priority is within bounds
  return parseFloat(clampedPriority.toFixed(1));
};

    

module.exports = {determineChangefreq,determinePriority}
