/** @module logout*/

function logout(req, res)
{
    /**
     * <pre>
     * login으로 생성해둔 쿠키파일을 삭제 시키는데 사용하는 함수로써
     * logout을 실행했을대 x_auth 쿠키에 존재하는 토큰을 초기화 시킴으로써
     * 클라이언트에 존재하는 토큰값을 삭제시키는 의의를 가짐
     * </pre>
     * 
     * @function logout
     * 
     * @param {*} res
     * 
     * @return 쿠키값의 내용을  ""으로 초기화, logoutSuccess: true
     */
    return res.clearCookie("x_auth", {path: '/visitors'})
        .status(200)
        .json({ logoutSuccess: true });
}

module.exports.logout = logout;