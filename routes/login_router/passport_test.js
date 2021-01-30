/** @module test */
function test(req, res) 
{
    /**
     * 단순 테스트를 위해 존재하는 함수로써 서버와의 연결이 되었는지 확인을 위해 제작하였음
     * 
     * @function test
     * 
     * @returns 패스포트 모듈 테스트
     */
    res.send("패스포트 모듈 테스트");
}

module.exports.test = test;