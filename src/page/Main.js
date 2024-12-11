const Main = () => {

    return (
        <>
            {/* 세로 정렬 */}
            <div>
                <MainHeader />
                
                {/* 가로 정렬 */}
                <div>
                    <MainBodyLeft />
                    <MainBodyRight />
                </div>

            </div>


        </>
    )
}
export default Main;