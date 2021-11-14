# Sleek-frontend

1. clone the repository
2. `npm install` to install dependancies
3. open `chrome://extensions` in your google chrome browser
4. select load unpacked. You will get a system file explorer window, select `Sleek-frontend/my-app/build` as the source for the extension.
The extension is now loaded.
5. spin up the express sever here: https://github.com/BPDanek/Sleek
 

Supported functions:
1. open the service worker console for the extension (will print the console logs of the backend script)
2. open the browser extension on the toolbar. This will trigger the popup script, which hits the express sevrer with deals data. The popup script runs a small react app with the latest Sleek offerings.
3. go to one of the domains Sleek is partnered with, and observe the service worker console. It should report whether the domain matches any of the deals.

The data flow:
* the express server has the deals data
* the chrome extension doesn't really do anything until the browser extension popup is rendered. 
* when the browser extension popup is rendered, it will contact the express server and collect data. Every time it is closed and reopened the data is fetched from the express server. 
  * in this step the data is sent to the browser extension backend.
* the browser extension background script checks the currently rendered tab to see if it matches any of the domains which correspond to a deal
  * if the tab which the user currently has rendered corresponds to a deal domain, then background script contacts the content script with the deal parameters
* the content script will render the deal parameters within the currently rendered tab on a banner [incomplete]
  * the content script banner will have a button: "Sleek Checkout, x% cash back" (example) (this data will be within the deal parameters) [incomplete]
  * when the button is clicked a http request will be sent to the express server with the customer parameters [incomplete]

I would have been happy to complete the incomplete sections, but it seemed counterproductive to spend too much time on this task since you want to see how I can operate under time constraint. 

Most of the effort was put into App.tsx, background.js, manifest.json. 

The boilerplate code for this backend was generated via:
https://medium.com/litslink/how-to-create-google-chrome-extension-using-react-js-5c9e343323ff
