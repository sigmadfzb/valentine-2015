<?php
header('Access-Control-Allow-Origin: *');
$phoneNum = (int) $_POST['telephone'];
$gaobai = $_POST['gaobai'];
$gaobai_id = $_GET['id'];

$con = mysql_connect("localhost","root","df1Sql") or die("无法创建数据连接<br><br>" .mysql_error());

$thepaperDB = mysql_select_db('thepaper',$con);

mysql_query("SET NAMES utf8");

if ($gaobai_id){
	$sql = "SELECT gaobai FROM valentine2015 WHERE id=".$gaobai_id;
	$result = mysql_query($sql,$con);
	$row = mysql_fetch_array($result, MYSQL_NUM);
	echo $row[0];
}
else{
	if(!$gaobai){
		die("好像没有写告白哟！");
	}
	if(!$phoneNum){
		die("好像没有填手机号哟！");
	}
	if(!$con){
		die('connect failed!');
	}
	else{

		if (check($phoneNum)){
			die("phone in");
		}
		else{
			$sql = "INSERT INTO valentine2015 (telephone, gaobai,time) VALUES (".$phoneNum.",'".$gaobai."',now())";
			
			$result = mysql_query($sql,$con);
			if($result){
				$newId = mysql_insert_id($con);
				$jsArr = array('id'=>$newId,'state'=>'success');
				echo json_encode($jsArr);
			}
			else{
				echo mysql_error();
				}
		}
	}
}

mysql_close($con);

function check($phone){
	global $con;
	$query = "SELECT telephone FROM valentine2015";

	$result = mysql_query($query,$con);
	$telephones = array();
	while($row = mysql_fetch_array($result, MYSQL_NUM)){
		$telephones[] = (int)$row[0];
	}
	return in_array($phone, $telephones);
}
?>