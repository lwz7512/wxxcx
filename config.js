/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://demos.kstartup.cn';

var config = {
    // @2018/08/29
    speedtestUrl: 'https://lwz7512-1256109222.cos.ap-shanghai.myqcloud.com/video/pain_of_coder.mp4.mp4',

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        loginUrl: `${host}/education/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/education/user`,

        prepayUrl: `${host}/education/course_dashang`,

        paybackUrl: `${host}/education/payback`,

        recommendsUrl: `${host}/education/recommendList`,

        coursesUrl: `${host}/education/courseList`,
        // courses in one topic
        cdetailUrl: `${host}/education/coursedetail`,

        customlUrl: `${host}/education/home/api/saveuserdetail`,
        // @2018/07/11
        pdfImgsUrl: `${host}/kfile/home/api/getimg`,
        // 课程上的跑马灯广告 @2018/07/26
        marqueeTxtUrl: `${host}/education/home/api/myrecommend`,
        // 按类型取数据
        categoryUrl: `${host}/education/home/api/courseList`,
        // 有多少种类型
        classTypeUrl: `${host}/education/home/api/course_type`,
        // course details @2018/08/08
        ddetailUrl: `${host}/education/home/api/detail`,
        // @2018/09/05
        magazineUrl: `${host}/education/home/api/information`,
        // @2018/09/06
        magDetailUrl:`${host}/education/home/api/information_detail`,
        // @2018/09/11
        collectUrl:  `${host}/education/home/api/collect`,//id, type,
        unCollectUrl:`${host}/education/home/api/uncollect`,
        myCollectUrl:`${host}/education/home/api/mycollect`,

        // 测试的信道服务地址
        // tunnelUrl: `${host}/weapp/tunnel`,
        // 上传图片接口
        // uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
