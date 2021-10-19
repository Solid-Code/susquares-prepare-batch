# susquares-prepare-batch
Node CL that produces a CSV with the data needed for a batch update from a properly sized image and a few parameters.  Title and URL can be edited in a spreadsheet before copy and pasting to Batch update tool.

Requirement:
Recent Versions of Node and NPM
A png that is the same dimensions as the area you want to customize.
ALERT: Only works with rectangular areas.
Usage:
git clone https://github.com/Solid-Code/susquares-prepare-batch.git
npm install
node index.js {your CSV}.csv {image path} {top left square} {squares wide} {squares high} "{title}" "{url}"
