## Installation

```bash
git clone https://github.com/alphabet-in/examin-web-front.git
cd exam-india-web-front
npm install
```
# Production deployment steps
1. Build: ng build --prod
2. Delete assets folder (if there's no new asset has added)
3. Deploy files: scp -r -i ~/.ssh/pems/ExamInAdmin.pem ~/workspace/ExamIn/exam-india-web-front/dist/* ubuntu@ec2-35-154-117-147.ap-south-1.compute.amazonaws.com:~/ExamIn/exam-india-rest-api/dist/public

## Contributors
[Abhijeet Salunkhe](https://github.com/abhijeetwebdev/)
[Dinesh Kumar](https://github.com/dineshk8/)
