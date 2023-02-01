const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//node 16버전부터 express내장되어있다.
// 16버전 router.use(express.urlencoded({ extended : true }))

router.use(bodyParser.urlencoded({ extended : true }))
//bodyParser : 리액트가 비동기 요청 -> 노드 req.body에 담겨서 온다. ({ extended : true })) ->제이슨포맷으로 처리한다.
//urlencoded : 주소를 보고 해당 데이터를 읽어준다.
//리액트가 받을때는 res.data (응답)
//요청받은 bodyParser을 url에 들어온 걸 처리한다.

router.get('/', (req, res, next) => {
   //리액트에서 사전인터뷰 -> sql테이블생성
   //req : 노드 , res : 리액트, next : 라우터

    var type = req.query.type; //bodyParser.urlencoded 이후 반드시 실행
    //요청이 목록인지 글쓰기인지 삭제인지 구분해서 처리
    if(type == 'list'){
        //목록요청
        // 노드가 axios.get('/notice?type=list') 노드서버에 요청해야만한다.
        try{
            //DB연결하고 sql문 가져와서 보내주는 모듈_여기가 진짜 작업하는 곳
            const dbcon = require('../db/dbconnect');
            //작업을 보내기 전에 내가 필요한 정보 더!!!! 담아서 보내주기
            //그 정보는 xml에 저장된 구체작인 sql문을 담아서 보내주는 것임
            //기존의 요청 내용에 나의 3가지 변수를 더 추가해서 next메서드로 보내줌

            //개발자가 추가한 요청내역
            req.body.mapper = 'reactSQL';
            req.body.crud = 'select'; // crud중 하나 반드시 선정
            req.body.mapperid = 'interviewList';
            
            //다음 라우터에 보내라
            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }       
    }
    else if(type == 'write'){
        // 노드가 axios.get('/notice?type=write') 노드서버에 요청해야만한다.
        res.send('sql접속할때 update로 해야되것네')
    }
    else if(type == 'update'){
         // 노드가 axios.get('/notice?type=update&no=5') 노드서버에 요청해야만한다.
        res.send('sql접속할때 update로 해야되것네')
    }
    else{
        // 노드가 axios.get('/notice?type=delete&no=4') 노드서버에 요청해야만한다.
        res.send('sql접속할때 delete로 해야되것네')
    }
})


module.exports = router;