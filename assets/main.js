/**
 * @此专题出自澎湃新闻网，http://thepaper.cn, 
 * @date    2015-2-13
 *By jigl@thepaper.cn, 43754530@qq.com
 *制作团队：李媛，季国亮
 */
var persons_dot = [
	{
	  name:"man1",
	  width:30,//in percent;
	  top:14.6,//in percent;
	  from:"right",
	  aim:33//in percent;
	},
	{
	  name:"female1",
	  width:30,
	  top:23.5,
	  from:"left",
	  aim:33
	},
	{
	  name:"man2",
	  width:40,
	  top:33.3,
	  from:"right",
	  aim:33
	},
	{
	  name:"man3",
	  width:40,
	  top:42.9,
	  from:"left",
	  aim:33
	},
	{
	  name:"man4",
	  width:36,
	  top:52.2,
	  from:"right",
	  aim:33
	},
	{
	  name:"man5",
	  width:40,
	  top:71.3,
	  from:"right",
	  aim:31.5
	}
];

var tip_dot = [
	{
	  name:"word1",
	  width:55,//in percent;
	  top:10.3,//in percent;
	  from:"left",
	  aim:12.5,//in percent;
	  transformClass:true
	},
	{
	  name:"qubit",
	  width:50,
	  top:17.5,
	  from:"left",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"word2",
	  width:55,
	  top:20.1,
	  from:"right",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"heart1",
	  width:13,
	  top:24,
	  from:"left",
	  aim:14,
	  transformClass:true
	},
	{
	  name:"heart2",
	  width:13,
	  top:25,
	  from:"right",
	  aim:14,
	  transformClass:true
	},
	{
	  name:"bird1",
	  width:35,
	  top:27.5,
	  from:"right",
	  aim:30,
	  transformClass:true
	},
	{
	  name:"bird2",
	  width:30,
	  top:29.3,
	  from:"right",
	  aim:20,
	  transformClass:true
	},
	{
	  name:"word3",
	  width:55,
	  top:30,
	  from:"left",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"award1",
	  width:58,
	  top:35,
	  from:"left",
	  aim:0,
	  transformClass:true
	},
	{
	  name:"word4",
	  width:55,
	  top:39.5,
	  from:"right",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"award2",
	  width:58,
	  top:44.8,
	  from:"right",
	  aim:0,
	  transformClass:true
	},
	{
	  name:"word5",
	  width:50.8,
	  top:49,
	  from:"left",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"award3",
	  width:58,
	  top:54.2,
	  from:"left",
	  aim:0,
	  transformClass:true
	},
	{
	  name:"word6",
	  width:55,
	  top:58.5,
	  from:"right",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"award4",
	  width:58,
	  top:64,
	  from:"right",
	  aim:0,
	  transformClass:true
	},
	{
	  name:"word7",
	  width:55,
	  top:68,
	  from:"left",
	  aim:4,
	  transformClass:true
	},
	{
	  name:"award5",
	  width:58,
	  top:73,
	  from:"left",
	  aim:0,
	  transformClass:true
	}

]
var directory = location.origin+location.pathname.substring(0, location.pathname.lastIndexOf('/'));
var shareInfo = {
	shareTitle:"告白金句：怎样一句话搞定她/他？快来围观我的告白吧！" ,	//填写社交分享的标题；
	shareDesc:"你觉得“告白金句”是什么？参与互动就有机会得情人节礼物。",	//填写社交分享的简介；
	shareLink:location.href,	//填写社交分享的链接；
	sharePic:directory+"/wxshare.jpg",//分享的图片地址
	};
var wxConfigParams={};

$(function(){
function getParam(name){
        var search = location.search;
        var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
                try{
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                }catch(e){
                        try{
                                items = decodeURIComponent(matcher[1]);
                        }catch(e){
                                items = matcher[1];
                        }
                }
        }
        return items;
}

function initIscroll(){
	iscrollHeight = parseInt(d3.select(".wall").style("height")),	//scollable container height
	myIscroll = new IScroll('.container', 
		{ probeType: 3,
		 mouseWheel: true,
		 bounce:false
		 }
		);
	myIscroll.on('scroll', updatePosition);
	myIscroll.on('scrollEnd', updatePosition);
}

function updatePosition () {	
	iscrollY = -(this.y>>0);
	setMotionPos();//set hotspots position;	
}

function setMotionPos(){
	//caculate the scrolled percent;
	var scrollPercent = Math.round((iscrollY/iscrollHeight)*10000)/100;
	var tipBox = d3.select('.game-tip-box');
	var formBox = d3.select('.game-form-box');

	scrollPercent>75?tipBox.classed('active',true):tipBox.classed('active',false);
	scrollPercent>85?formBox.classed('active',true):formBox.classed('active',false);

	motions.style("left",function(d){
		  		if(d.from=="left"){
		  			var type = d3.select(this).classed('person')?"person":"tip";    
		  			return getHPosition(d,this,type);
		  			}	
			  	})
		  	.style('right',function(d){
		  		if(d.from=="right"){
		  			var type = d3.select(this).classed('person')?"person":"tip";
		  			return getHPosition(d,this,type);
		  			}
		  	})
		  	.classed('active',function(d){
		  		var d3This = d3.select(this);
		  		var curPos = parseInt(d.from=="left"?d3This.style('left'):d3This.style('right'));
		  		var aimPos = d.aim*winWidth/100;
		  		if(curPos>aimPos*0.9){
		  			return true;
		  		}
		  	});
}
//get horizontal position
function getHPosition(data,ele,type){
	var from = parseInt(d3.select(ele).style("width"));
	var to = data.aim*winWidth/100;
	var aim = data.top/100*iscrollHeight;

	var scrollScale = d3.scale.linear()
						.range([to,-from])
						.clamp(true);
    type=="person"?scrollScale.domain([iscrollY+winHeight*0.6,iscrollY+winHeight*0.75]):
    			   scrollScale.domain([iscrollY+winHeight*0.2,iscrollY+winHeight*0.35]);	
	return scrollScale(aim)+"px";
}

var myIscroll,
	iscrollY =0 ,	//scrolled pix in Y;
	iscrollHeight = 0,	//scollable container height
	audio = document.getElementById('audio');
	winHeight = document.body.clientHeight?document.body.clientHeight:window.innerHeight,
	winWidth = document.body.clientWidth?document.body.clientWidth:window.innerWidth;

//big heart loop
var heart_loop = document.getElementById('heart-loop'),
	heart_loop_length = 0,
	heart_loop_t = setInterval(function(){
		heart_loop_length++;
		if(heart_loop_length>4) {heart_loop_length=0;}
		if(heart_loop_length==0)
			heart_loop.style.backgroundImage = "none";
		else
			heart_loop.style.backgroundImage = "url(images/heart-loop-"+heart_loop_length+".png)";
	},400);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//shine the light-shine;
var light_shine = d3.selectAll('.light-shine');
	setInterval(function(){
		light_shine.each(function(){
			var d3_this = d3.select(this);
			var active = d3_this.classed('active');
			active?d3_this.classed('active',false):d3_this.classed('active',true);
		})
		},400);

var persons, tips, motions;

//add each person to person box;
function addMotions(){
	persons = d3.select('.person-box').selectAll('.person')
					.data(persons_dot)
					.enter()
					.append('div')
					.classed('person',true)
					.classed('motion',true)
					.style('top',function(d){return d.top+"%";})
					.style('width',function(d){return d.width+"%"})
					.style('right',function(d){
						var eleWidth = d3.select(this).style('width');
			  			return d.from=="right"?"-"+eleWidth:"";
					})
					.style('left',function(d){
						var eleWidth = d3.select(this).style('width');
			  			return d.from=="left"?"-"+eleWidth:"";
					});

	tips = d3.select('.tip-box').selectAll('.tip')
						.data(tip_dot)
						.enter()
						.append('div')
						.classed('tip',true)
						.classed('motion',true)
						.style('top',function(d){return d.top+"%";})
						.style('width',function(d){return d.width+"%"})
						.style('right',function(d){
							var eleWidth = d3.select(this).style('width');
				  			return d.from=="right"?"-"+eleWidth:"";
						})
						.style('left',function(d){
							var eleWidth = d3.select(this).style('width');
				  			return d.from=="left"?"-"+eleWidth:"";
						});
	motions = d3.selectAll('.motion');
	motions.each(function(d,i){
		if(d.transformClass){
			d3.select(this).classed(d.name,true);
		}
	});
	//add img to each motion box;			
	motions.append('img')
	   .attr('src',function(d){return "images/"+d.name+".png"});
}

function tijiao(){
	var gaobaiText = $('#gaobai-txtarea').val().trim();
	var phone = $('#phone').val();
	var info = {telephone:phone,gaobai:gaobaiText};
	var $final_tip = $('#final-tip');
	if(!gaobaiText){
		alert('忘了写告白话啦！');
		return false;
	}
	if(!phone||phone.length<11||parseInt(phone[0])!=1){
		alert('手机号不对哦！');
		return false;
	}
	$('#gaobai-txtarea,.phone-input,#leastword,.tijiao').css('display','none');
	$('#final-gaobai,#final-tip').css('display','block');
	$('#gaobai-btn').css('display','inline-block');
	$('#final-gaobai').text(gaobaiText);
	$.post("http://121.42.52.51/interactive/2015/valentine/valentine.php",info, function(data) {
		
		if(data=="phone in") {
			$final_tip.text('您已经告白过啦！');
		}
		else {
			data = JSON.parse(data.trim());
			console.log(data);
			console.log(data.id);
			shareInfo.shareLink = directory+'/index.html?id='+data.id;
			$final_tip.html('快分享给好友，<br/>让他/她看见你的告白吧~~');
			weixinReady();
		}
	});
}
function gaobai(){
	var $this = $(this);
 	var val = $this.val();

    var len = 30;
    if(val.length > len){
        val = val.substr(0, len);
    }
    $this.val(val);
    $("#leastword").text("还剩"+(len - val.length)+"字哦！");
}

function phone (){
 var $this = $(this);
 	var val = $this.val();

    var len = 11;
    if(val.length > len){
        val = val.substr(0, len);
    }
    $this.val(val);
}
$("#gaobai-btn").on('click',function(){
	$(this).css('display','none');
	$('#gaobai-txtarea,.phone-input,#leastword,.tijiao').css('display','block');
	$("#leastword").text('最多30字哦！');
	$('#gaobai-txtarea,.phone-input textarea').val('');
	$('#final-gaobai').css('display','none')
					.text('');
	$("#final-tip").css('display','none');
})

var gaobai_id = getParam('id');
if(gaobai_id){
	$.get("http://121.42.52.51/interactive/2015/valentine/valentine.php",{id:gaobai_id},function(data){
		if(data){
			$('#gaobai-txtarea,.phone-input,#leastword,.tijiao').css('display','none');
			$('#final-gaobai,#final-tip').css('display','block');
			$('#gaobai-btn').css('display','inline-block');
			$('#final-gaobai').text(data);
		}
	})
}

$('#gaobai-txtarea').on('input',gaobai);
$('#phone').on('input',phone);
$("#tijiao").on('click',tijiao);
$(".audio-btn").on('click',function(){
	var $this = $(this);
	console.log('audio');
	if($this.hasClass('mute')){
		$this.removeClass('mute');
		audio.play();
	}
	else{
		$this.addClass('mute');
		audio.pause();
	}
});

//loading
var loading_t = setInterval(function(){
		if($('.page10 img')[0].complete){
				$('#loading').fadeOut();
				initIscroll();
				addMotions();
				audio.play();
				clearInterval(loading_t);
			}
		},100);
	});

//get weixin share config;
$.post("http://121.42.52.51/wxShare/jssdk.php", {url: location.href}, function(data, textStatus, xhr) {
	if(data){
			data =JSON.parse(data.trim());
			wxConfigParams.debug = false;
			wxConfigParams.appId = data.appId;
			wxConfigParams.timestamp = data.timestamp;
			wxConfigParams.nonceStr = data.nonceStr;
			wxConfigParams.signature = data.signature;
			wxConfigParams.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage'];
			wx.config(wxConfigParams);
			wx.ready(weixinReady)
		}
});

function weixinReady(){
	wx.onMenuShareTimeline({
		title:shareInfo.shareTitle,
		imgUrl:shareInfo.sharePic,
		link:shareInfo.shareLink,
		desc:shareInfo.shareDesc
	});
	wx.onMenuShareAppMessage({
		title:shareInfo.shareTitle,
		imgUrl:shareInfo.sharePic,
		link:shareInfo.shareLink,
		desc:shareInfo.shareDesc
	});
}
