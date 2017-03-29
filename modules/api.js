/**
 * Created by pdc on 2016/10/21.
 */
//用户管理
let app=require("common");

var date={
    //积分收入明细
    queryUserScanCode: {
        url: "cloud2.activity.api/v2/member/userGain/queryUserScanCode",
        param: "userToken,tobacco"
    },
    //积分支出明细
    queryUserPointUse: {
        url: "cloud2.activity.api/v2/member/userGain/queryUserPointUse",
        param: "userToken,materialsId"
    },
    //中奖记录
    winList: {
        url: "cloud2.activity.api/v2/member/userGain/list",
        param: "phone,userToken,materialsId,tobacco,pageNum,pageSize"
    },
    //获取用户信息
    login:{
        url:"cloud2.activity.api/v2/member/userInfo/login",
        param:"msg"
    },
    //判断用户有无抽奖机会
    checkActivity:{
        url:"cloud2.activity.api/v2/market/drwaLottery/checkActivity",
        param:"barcode,userToken"
    },
    //抽奖
    doDrawLottery:{
        url:"cloud2.activity.api/v2/market/drwaLottery/doDrawLottery",
        param:"barcode,openId,userToken,province,city"
    },
    //获取用户奖品地址信息
    getUserAddress:{
        url:"cloud2.activity.api/v2/member/userGain/getUserAddress",
        param:"userToken,orderNo"
    },
    //提交用户地址
    saveAddress:{
        url:"cloud2.activity.api/v2/member/userGain/saveAddress",
        param:"orderNo,userToken,contacts,phone,province,city,area,address",
        type:"post"
    },
    //获取用户最后一次填写的地址
    userLastAddress:{
        url:"cloud2.activity.api/v2/member/userGain/userLastAddress",
        param:"userToken"
    },
    //话费充值
    useCalls:{
        url:"cloud2.activity.api/v2/member/userGain/useCalls",
        param:"phone,orderNo,userToken",
        type:"post"
    },
    //卡券礼包详情
    queryPrizeGiftByGiftId:{
        url:"cloud2.activity.api/market/prize/queryPrizeGiftByGiftId.do",
        param:"giftId"
    },
    //领取卡券v2/member/userGain/choosePrize
    choosePrize:{
        url:"cloud2.activity.api/v2/member/userGain/choosePrize",
        param:"userToken,orderNo,prizeId,prePrizeId",
        type:"post"
    },
    //领取红包接口
    toRedPayUrl:{
        url: "cloud2.activity.api/v2/market/drwaLottery/toRedPayUrl.do",
        param:"token,orderNo,prizeId,isFlag",
        type:"post"
    },
    //红包回调接口
    returnRedPay:{
        url: "cloud2.activity.api/v2/market/drwaLottery/returnRedPay.do",
        param:"orderNo,result,isFlag, message",
        type:"post"
    },
    //评测师领取接口
    toAssessorExchange:{
        url: "cloud2.activity.api/v2/market/drwaLottery/toAssessorExchange.do",
        param:"token,orderNo,isFlag",
        type:"post"
    }
};
module.exports= app.moduleFactory(date);