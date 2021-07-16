module.exports={
    "email":"Your GitHub Email",
    "password":"Your GitHub Password",
    "options":{
        "headless":false,
        "args": [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu"
          ],
          "executablePath":"Location of browser binary (chrome/brave)" //eg C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe
    },
    "timeout":70000 // Timeout if your internet is fast you can lower the value 
     // it is the maximum waiting time in milliseconds before throwing an error while loading pages
}
