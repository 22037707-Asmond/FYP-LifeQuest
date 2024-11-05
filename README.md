# LifeQuest Video Demo


https://github.com/user-attachments/assets/c6da1e52-6574-4ab6-a054-03cafd1c0491


---
# Setting Up LifeQuest

## Installation and Setup Steps

### Step 1: Install Maven
1. Go to the [Apache Maven download page](https://maven.apache.org/download.cgi).
2. Download the binary zip file (e.g., `apache-maven-3.x.x-bin.zip`).

### Step 2: Add Maven to the PATH
1. Search for "Edit Environment Variables" and open it.
2. Under "System variables," find the `Path` variable and select "Edit."
3. Click "New" and add the path to Maven’s `bin` directory (e.g., `C:\apache-maven-3.x.x\bin`).

### Step 3: Running the Backend

```bash
cd backend
mvn clean package
runJava.bat
```

### Step 4: Setting Up LifeQuest - Client

```bash
cd client-frontend
npm install
npm run
```

### Step 5: Setting Up LifeQuest - Agent

```bash
cd agent-frontend
npm install
npm run
```

> **Note**: When prompted, confirm that port 3000 is running for the client end.

### Step 6: Setting Up Middleware

```bash
cd 'flask middleware'
pip install -r requirements.txt
python run.py
```

### Step 7: Setting Up Flowise Server (Do this in cmd not powershell)

```bash
npm install
npm install langchainhub
set port=3005 & npx flowise start 
```

---

# Setting Up PRUKaya
## Installation and Setup Steps

### Step 1: Setting Up Telebot Server
```bash
cd PruKaya
pip install -r requirements.txt
python -m bot.bot
```

### Step 2: Run the flowise server (Do this in cmd not powershell)
```bash
cd ..
cd flowise 
set port=3005 & npx flowise start 
```
