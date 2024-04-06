# FYP
This is my final year project at Asia Pacific University
## MEAN app + Flask for model prediction

### Summary   
The topic I chose for my Final Year Project at Asia Pacific University is Heart Disease Prediction Using Machine Learning Models.  
Instead of taking the easy route of just building a model for heart disease prediction, I decided to test the skills I gained at my previous internships and build a MEAN application.  
Regrettably, I did bite off more than I could chew as I decided to attempt to deploy my model through AWS with no prior experience, causing me to spend some time figuring out how to do so.  
However, I do believe I managed to achieve what I set out to build, albeit a tad unrefined. And it was a good learning experience.  

Dataset used for model building:  
https://www.kaggle.com/datasets/cherngs/heart-disease-cleveland-uci/data

## Notes for self
### Setup Flask backend
1. Navigate-to and install required packages
```
cd prediction-backend
pip install -r requirements.txt
```
2. Run python server (Configured to http://127.0.0.1/)
```
py app.py
```
### Setup Express backend
1. Navigate-to and install packages
```
cd server
npm install
```
2. Run express server (Configured to localhost:3000)
```
npm run dev
```
### Setup Angular frontend
1. Navigate-to and install packages
```
cd frontend\webapp
npm install
```
2. Run frontend server
```
ng serve
```
