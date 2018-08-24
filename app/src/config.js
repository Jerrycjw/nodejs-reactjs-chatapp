export const production = true; // set it to true when deploy to the server

const domain = production ? 'sleepy-eyrie-64329.herokuapp.com' : '127.0.0.1:3001'; // if you have domain pointed to digitalOcean Cloud server let use your domain.eg: tabvn.com
export const websocketUrl = `ws://${domain}`
export const apiUrl = `https://${domain}`