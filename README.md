# Setting Up LifeQuest

## Setting Up Backend

1. Go to the [Apache Maven download page](https://maven.apache.org/download.cgi).
2. Download the binary zip file (e.g., `apache-maven-3.x.x-bin.zip`).

### Add Maven to the PATH

- Search for "Edit Environment Variables" and click on it.
- Under "System variables," find the `Path` variable and select it. Click "Edit."
- Click "New" and add the path to the `bin` directory of your Maven installation (e.g., `C:\apache-maven-3.x.x\bin`).

---

## Running the Backend

```bash
cd backend
mvn clean package
cd target 
java -jar backend-0.0.1-SNAPSHOT.jar
```
# Setting up  LifeQuest - Client
cd client-frontend
npm install 

### After installation run
npm run 

# Setting up  LifeQuest - Agent
cd agent-frontend
npm install 

### After installation run
npm run 
click yes 3000 port is running for client end

# Setting up Middleware
cd 'flask middleware'
pip install -r requirements.txt
python run.py

# Setting up flowise server
npm install
npm install langchainhub

### After installation run
set port=3005 & npx flowise start



