$(function () {
    var _result = $("#result");
    
    var _name = undefined;
    var _data = undefined;
    
    var _save = function () {
        var _n = _name + " (" + (_data.length-1) + ")";
        save_to_ods(_n, _data);
    };
    
    for (var _i in _job_school_list) {
        if (_job_school_list[_i][0] !== _name) {
            if (_data !== undefined) {
                _save();
            }
            _name = _job_school_list[_i][0];
            _data = [ ["縣市別","學校名稱", "學校網址", "圖書館網址", "圖書館統計", "記錄文件"] ];
        }
        
        var _row = _job_school_list[_i];
        _row.push("");
        _data.push(_row);
    }
    
    _save();
    
});

// ----------------------
var _job_school_list = [
["台中市","大甲高工","http://www.tcvs.tc.edu.tw","http://www.tcvs.tc.edu.tw/releaseRedirect.do?unitID=183&pageID=3065","http://163.23.175.5/LIB/LibView.aspx?11319"],
["台中市","光華高工","http://www.khvs.tc.edu.tw","http://203.72.10.253/NewWebpac/","http://163.23.175.5/LIB/LibView.aspx?11552"],
["台中市","沙鹿高工","http://www.slvs.tc.edu.tw","http://library.slvs.tc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11270"],
["台中市","東勢高工","http://www.tsvs.tc.edu.tw","http://www.tsvs.tc.edu.tw/ischool/publish_page/22/","http://163.23.175.5/LIB/LibView.aspx?11140"],
["台中市","臺中家商","http://www.tchcvs.tc.edu.tw","http://www2.tchcvs.tc.edu.tw/unit/unit-5/_AWeb2012/","http://163.23.175.5/LIB/LibView.aspx?11098"],
["台中市","臺中高工","http://www.tcivs.tc.edu.tw","http://lib.tcivs.tc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11446"],
["台中市","興大附農","http://www.tcavs.tc.edu.tw","http://192.192.136.8/webopac","http://163.23.175.5/LIB/LibView.aspx?11121"],
["台中市","豐原高商","http://www.fyvs.tc.edu.tw","http://www.fyvs.tc.edu.tw/ischool/publish_page/9/","http://163.23.175.5/LIB/LibView.aspx?11305"],
["台中市","霧峰農工","http://www.wufai.edu.tw/index.html","http://210.60.229.242/xoops/","http://163.23.175.5/LIB/LibView.aspx?11094"],
["台北市","士林高商","http://www.slhs.tp.edu.tw","http://home.slhs.tp.edu.tw/slhs521/lib2009","http://163.23.175.5/LIB/LibView.aspx?11189"],
["台北市","大安高工","http://www.taivs.tp.edu.tw","http://lib.taivs.tp.edu.tw/opac/","http://163.23.175.5/LIB/LibView.aspx?11136"],
["台北市","內湖高工","http://web.nihs.tp.edu.tw","http://library.nihs.tp.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11513"],
["台北市","木柵高工","http://www.mcvs.tp.edu.tw","http://https://sites.google.com/a/mcvs.tp.edu.tw/tu-shu-guan/","http://163.23.175.5/LIB/LibView.aspx?11269"],
["台北市","育達家商","http://www.yudah.tp.edu.tw","http://www.yudah.tp.edu.tw/wpac/","http://163.23.175.5/LIB/LibView.aspx?11268"],
["台北市","東方工商","http://www.tfvs.tp.edu.tw/tfvs/main.php","http://www.tfvs.tp.edu.tw/web/library/k1.html","http://163.23.175.5/LIB/LibView.aspx?11614"],
["台北市","松山工農","http://192.192.135.24/","http://cweb.saihs.edu.tw/web/lib/","http://163.23.175.5/LIB/LibView.aspx?11559"],
["台北市","松山家商","http://www.ssvs.tp.edu.tw","http://lib.ssvs.tp.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11579"],
["台北市","南港高工","http://www.nkhs.tp.edu.tw","http://nkhs.ebook.hyread.com.tw/index.jsp","http://163.23.175.5/LIB/LibView.aspx?11611"],
["台北市","惇敘工商","http://www.thvs.tp.edu.tw","http://www.thvs.tp.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11591"],
["台北市","喬治工商","http://www.gvs.tp.edu.tw","http://www.gvs.tp.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11612"],
["台北市","華岡藝校","http://www.hka.edu.tw","http://210.71.73.10/Webpac/webpac.aspx","http://163.23.175.5/LIB/LibView.aspx?11518"],
["台北市","開平餐飲","http://www.kpvs.tp.edu.tw","http://","http://163.23.175.5/LIB/LibView.aspx?11619"],
["台北市","開南商工","http://www.knvs.tp.edu.tw","http://www.knvs.tp.edu.tw/school/study/LibraryWeb1/library.html","http://163.23.175.5/LIB/LibView.aspx?11538"],
["台北市","稻江高商","http://www.tkcvs.tp.edu.tw","http://www.tkcvs.tp.edu.tw/library/index.htm","http://163.23.175.5/LIB/LibView.aspx?11455"],
["台北市","稻江護家","http://www.tcnvs.tp.edu.tw","http://library2.tcnvs.tp.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11498"],
["台東縣","公東高工","http://www.ktus.ttct.edu.tw","http://web1.ktus.ttct.edu.tw/files/11-1001-576.php","http://163.23.175.5/LIB/LibView.aspx?11382"],
["台東縣","成功商水","http://www.ckvs.ttct.edu.tw","http://210.59.11.5/newlib/first.html","http://163.23.175.5/LIB/LibView.aspx?11405"],
["台東縣","臺東高商","http://www.tscvs.ttct.edu.tw","http://lib.tscvs.ttct.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11139"],
["台東縣","關山工商","http://www.ksvs.ttct.edu.tw/ezindex1.php","http://lib-server.ksvs.ttct.edu.tw//mitopacweb/","http://163.23.175.5/LIB/LibView.aspx?11170"],
["台南市","北門農工","http://www.pmai.tnc.edu.tw","http://www.pmai.tnc.edu.tw/sub/news/index.asp?Parser=9,5,338,38","http://163.23.175.5/LIB/LibView.aspx?11130"],
["台南市","玉井工商","http://www.ycvs.tn.edu.tw","http://www.ycvs.tn.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11423"],
["台南市","白河商工","http://www.phvs.tn.edu.tw","http://mdl.phvs.tn.edu.tw/wp/lib","http://163.23.175.5/LIB/LibView.aspx?11257"],
["台南市","育德工家","http://www.ytvs.tn.edu.tw/","http://https://sites.google.com/site/yudegongjiatushuguan/","http://163.23.175.5/LIB/LibView.aspx?11514"],
["台南市","亞洲餐旅","http://www.asvs.tn.edu.tw","http://web.asvs.tn.edu.tw/index.php?option=module&lang=cht&task=showlist&id=329&index=13","http://163.23.175.5/LIB/LibView.aspx?11428"],
["台南市","南英商工","http://www.nyvs.tn.edu.tw","http://www.nyvs.tn.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11274"],
["台南市","曾文家商","http://www.twvs.tnc.edu.tw","http://web.twvs.tnc.edu.tw/~lib/","http://163.23.175.5/LIB/LibView.aspx?11314"],
["台南市","曾文農工","http://www.twivs.tnc.edu.tw","http://210.59.17.5/~library/","http://163.23.175.5/LIB/LibView.aspx?11313"],
["台南市","陽明工商","http://www.ymvs.tnc.edu.tw","http://www.ymvs.tnc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11363"],
["台南市","慈幼工商","http://www.ssvs.tn.edu.tw","http://libw.ssvs.tn.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11366"],
["台南市","新化高工","http://www.hhvs.tn.edu.tw","http://210.60.50.2/library/","http://163.23.175.5/LIB/LibView.aspx?11273"],
["台南市","新營高工","http://www.hyivs.tnc.edu.tw","http://www.hyivs.tnc.edu.tw/80/hyivs80.htm","http://163.23.175.5/LIB/LibView.aspx?11384"],
["台南市","臺南海事","http://www.tnvs.tn.edu.tw","http://www.tnvs.tn.edu.tw/sub/news/index.asp?Parser=9,4,228,26","http://163.23.175.5/LIB/LibView.aspx?11377"],
["台南市","臺南高工","http://www.ptivs.tnc.edu.tw/front/bin/home.phtml","http://203.72.21.6/library/Default.htm","http://163.23.175.5/LIB/LibView.aspx?11302"],
["台南市","臺南高商","http://www.tncvs.tn.edu.tw","http://lib.tncvs.tn.edu.tw/tncvslib/library.htm","http://163.23.175.5/LIB/LibView.aspx?11157"],
["宜蘭縣","宜蘭高商","http://school.ilvs.ilc.edu.tw/front/bin/home.phtml","http://school.ilvs.ilc.edu.tw/front/bin/cglist.phtml?Category=170","http://163.23.175.5/LIB/LibView.aspx?11525"],
["宜蘭縣","頭城家商","http://www.tcvs.ilc.edu.tw","http://lib.tcvs.ilc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11516"],
["宜蘭縣","羅東高工","http://web.ltivs.ilc.edu.tw/bin/home.php","http://web.ltivs.ilc.edu.tw/files/11-1000-172.php","http://163.23.175.5/LIB/LibView.aspx?11154"],
["宜蘭縣","羅東高商","http://www.ltcvs.ilc.edu.tw","http://www.ltcvs.ilc.edu.tw/code/Layout.aspx?board=LTCVS_LIBRARY&pi=0&ti=8","http://163.23.175.5/LIB/LibView.aspx?11109"],
["宜蘭縣","蘇澳海事","http://www.savs.ilc.edu.tw","http://www.savs.ilc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11463"],
["花蓮縣","上騰工商","http://www.chvs.hlc.edu.tw","http://www.chvs.hlc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11497"],
["花蓮縣","光復商工","http://www.kfcivs.hlc.edu.tw","http://www1.kfcivs.hlc.edu.tw/cht/adm/lib/","http://163.23.175.5/LIB/LibView.aspx?11452"],
["花蓮縣","花蓮高工","http://www.hlis.hlc.edu.tw","http://www.hlis.hlc.edu.tw/~d06","http://163.23.175.5/LIB/LibView.aspx?11476"],
["花蓮縣","花蓮高商","http://www.hlbh.hlc.edu.tw","http://www.hlbh.hlc.edu.tw/~office7/","http://163.23.175.5/LIB/LibView.aspx?11097"],
["花蓮縣","花蓮高農","http://www.hla.hlc.edu.tw","http://www.hla.hlc.edu.tw/a610/","http://163.23.175.5/LIB/LibView.aspx?11433"],
["金門縣","金門農工","http://www.kmvs.km.edu.tw","http://163.25.20.6","http://163.23.175.5/LIB/LibView.aspx?11323"],
["南投縣","仁愛高農","http://www.ravs.ntct.edu.tw","http://libery.ravs.ntct.edu.tw/mitopacweb/","http://163.23.175.5/LIB/LibView.aspx?11510"],
["南投縣","水里商工","http://www.slvs.ntct.edu.tw","http://library.slvs.ntct.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11282"],
["南投縣","同德家商","http://www.tdvs.ntct.edu.tw","http://www.tdvs.ntct.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11502"],
["南投縣","南投高商","http://www.pntcv.ntct.edu.tw","http://163.22.165.78/ischool/publish_page/18/","http://163.23.175.5/LIB/LibView.aspx?11206"],
["南投縣","埔里高工","http://www.plvs.ntct.edu.tw","http://library.plvs.ntct.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11188"],
["南投縣","草屯商工","http://www.ttvs.ntct.edu.tw","http://163.22.44.42/","http://163.23.175.5/LIB/LibView.aspx?11223"],
["屏東縣","內埔農工","http://www.npvs.ptc.edu.tw","http://163.24.156.228/releaseRedirect.do?unitID=4&pageID=3782","http://163.23.175.5/LIB/LibView.aspx?11374"],
["屏東縣","日新工商","http://www.jhvs.ptc.edu.tw","http://lib.jhvs.ptc.edu.tw/webpac/","http://163.23.175.5/LIB/LibView.aspx?11590"],
["屏東縣","民生家商","http://www.msvs.ptc.edu.tw","http://www.msvs.ptc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11386"],
["屏東縣","東港海事","http://www.tkms.ptc.edu.tw","http://www.tkms.ptc.edu.tw/index1024.htm","http://163.23.175.5/LIB/LibView.aspx?11346"],
["屏東縣","屏東高工","http://www.ptivs.ptc.edu.tw","http://www.ptivs.ptc.edu.tw/library","http://163.23.175.5/LIB/LibView.aspx?11333"],
["屏東縣","恆春工商","http://www.hcvs.ptc.edu.tw","http://163.24.155.21/webpac/index.aspx","http://163.23.175.5/LIB/LibView.aspx?11119"],
["屏東縣","國立佳冬高農","http://www.ctvs.ptc.edu.tw","http://163.24.157.248/單位/library/index.htm","http://163.23.175.5/LIB/LibView.aspx?11343"],
["屏東縣","華洲工家","http://www.hcivs.ptc.edu.tw","http://www.hcivs.ptc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11595"],
["苗栗縣","大湖農工","http://www.thvs.mlc.edu.tw","http://www.thvs.mlc.edu.tw/ischool/publish_page/7/","http://163.23.175.5/LIB/LibView.aspx?11204"],
["苗栗縣","中興商工","http://www.csvs.mlc.edu.tw/bin/home.php","http://www.csvs.mlc.edu.tw/files/11-1000-391.php","http://163.23.175.5/LIB/LibView.aspx?11331"],
["苗栗縣","育民工家","http://www.ymvs.mlc.edu.tw","http://www.ymvs.mlc.edu.tw/in.htm","http://163.23.175.5/LIB/LibView.aspx?11248"],
["苗栗縣","苗栗高商","http://www.mlvs.mlc.edu.tw","http://203.71.198.14/~library/","http://163.23.175.5/LIB/LibView.aspx?11277"],
["苗栗縣","苗栗農工","http://www.mlaivs.mlc.edu.tw","http://163.19.234.91","http://163.23.175.5/LIB/LibView.aspx?11182"],
["苗栗縣","賢德工商","http://www.sdvs.mlc.edu.tw/","http://www.sdvs.mlc.edu.tw/affair.php?id=11","http://163.23.175.5/LIB/LibView.aspx?11616"],
["苗栗縣","龍德家商","http://www.ldvs.mlc.edu.tw","http://www.ldvs.mlc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11260"],
["桃園市","中壢家商","http://www.clvs.tyc.edu.tw/","http://www.clvs.tyc.edu.tw/web/lib/","http://163.23.175.5/LIB/LibView.aspx?11196"],
["桃園市","中壢高商","http://www.clvsc.tyc.edu.tw/bin/home.php","http://www.clvsc.tyc.edu.tw/files/11-1000-101-1.php","http://163.23.175.5/LIB/LibView.aspx?11562"],
["桃園市","方曙商工","http://www.fsvs.tyc.edu.tw","http://163.25.85.7/opac850/","http://163.23.175.5/LIB/LibView.aspx?11328"],
["桃園市","永平工商","http://www.ypvs.tyc.edu.tw","http://saturn.ypvs.tyc.edu.tw/web/lib/default.asp","http://163.23.175.5/LIB/LibView.aspx?11243"],
["桃園市","成功工商","http://www.ckvs.tyc.edu.tw","http://library.ckvs.tyc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11238"],
["桃園市","國立北科附工","http://www.tyai.tyc.edu.tw","http://lib.tyai.tyc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11205"],
["高雄市","三民家商","http://www.smvhs.kh.edu.tw","http://newlib.smvhs.kh.edu.tw/webpac/index.aspx","http://163.23.175.5/LIB/LibView.aspx?11335"],
["高雄市","三信家商","http://163.32.84.1/sansin2017/index.html","http://163.32.84.93/office/ic/","http://163.23.175.5/LIB/LibView.aspx?11390"],
["高雄市","中山工商","http://www.csic.khc.edu.tw","http://www.csic.khc.edu.tw/11/1101/index.asp","http://163.23.175.5/LIB/LibView.aspx?11483"],
["高雄市","中正高工","http://www.ccvs.kh.edu.tw","http://sites.ccvs.kh.edu.tw/site/library","http://163.23.175.5/LIB/LibView.aspx?11237"],
["高雄市","中華藝校","http://www.charts.kh.edu.tw/index1.htm","http://","http://163.23.175.5/LIB/LibView.aspx?11373"],
["高雄市","岡山農工","http://www.ksvs.khc.edu.tw","http://libbase.ksvs.khc.edu.tw/webopac/","http://163.23.175.5/LIB/LibView.aspx?11144"],
["高雄市","海青工商","http://www.hcvs.kh.edu.tw","http://163.32.98.15/dep350","http://163.23.175.5/LIB/LibView.aspx?11432"],
["高雄市","高英工商","http://210.60.110.1","http://210.60.110.1","http://163.23.175.5/LIB/LibView.aspx?11596"],
["高雄市","高苑工商","http://www.kyvs.ks.edu.tw","http://www.kyvs.ks.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11135"],
["高雄市","高雄高工","http://www.ksvs.kh.edu.tw","http://library.ksvs.kh.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11110"],
["高雄市","高雄高商","http://www.ksvcs.kh.edu.tw","http://teaweb.ksvcs.kh.edu.tw/~lib/","http://163.23.175.5/LIB/LibView.aspx?11391"],
["高雄市","高鳳工家","http://www.kfvhs.kh.edu.tw","http://www.kfvhs.kh.edu.tw/libm","http://163.23.175.5/LIB/LibView.aspx?11537"],
["高雄市","高餐大附中","http://nkhhs.nkuht.edu.tw/","http://nkhhs.nkuht.edu.tw/zh_tw/library","http://163.23.175.5/LIB/LibView.aspx?11213"],
["高雄市","國際商工","http://www.kcvs.kh.edu.tw","http://www.kcvs.kh.edu.tw/?act=site1&root=20161201010&ad_id=20161201010","http://163.23.175.5/LIB/LibView.aspx?11228"],
["高雄市","華德工家","http://www.htvs.ks.edu.tw","http://www.htvs.ks.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11561"],
["高雄市","旗山農工","http://www.csvs.khc.edu.tw","http://www.csvs.khc.edu.tw/releaseRedirect.do?unitID=183&pageID=3134","http://163.23.175.5/LIB/LibView.aspx?11549"],
["高雄市","旗美商工","http://www.cmvs.ks.edu.tw","http://www.cmvs.ks.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11583"],
["高雄市","鳳山商工","http://www.fsvs.ks.edu.tw","http://lib.fsvs.ks.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11104"],
["高雄市","樹德家商","http://www.shute.kh.edu.tw","http://lib.shute.kh.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11123"],
["基隆市","光隆家商","http://www.klhcvs.kl.edu.tw/","http://210.59.1.9/podcasts/148?locale=zh_tw","http://163.23.175.5/LIB/LibView.aspx?11491"],
["基隆市","基隆海事","http://www.klvs.kl.edu.tw","http://www.klvs.kl.edu.tw/library/","http://163.23.175.5/LIB/LibView.aspx?11398"],
["基隆市","基隆商工","http://www.klcivs.kl.edu.tw","http://210.70.60.216","http://163.23.175.5/LIB/LibView.aspx?11492"],
["基隆市","培德工家","http://www.ptvs.kl.edu.tw","http://","http://163.23.175.5/LIB/LibView.aspx?11581"],
["雲林縣","土庫商工","http://www.tkvs.ylc.edu.tw","http://fire.tkvs.ylc.edu.tw/~u114013/book/","http://163.23.175.5/LIB/LibView.aspx?11399"],
["雲林縣","大成商工","http://www.tcvhs.ylc.edu.tw","http://lib.tcvhs.ylc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11397"],
["雲林縣","大德工商","http://www.ddvs.ylc.edu.tw","http://www.ddvs.ylc.edu.tw/releaseRedirect.do?unitID=183&pageID=3688","http://163.23.175.5/LIB/LibView.aspx?11486"],
["雲林縣","北港農工","http://www.pkvs.ylc.edu.tw","http://lib.pkvs.ylc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11153"],
["雲林縣","西螺農工","http://www.hlvs.ylc.edu.tw","http://lib01.hlvs.ylc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11159"],
["雲林縣","虎尾農工","http://www.hwaivs.ylc.edu.tw","http://www.hwaivs.ylc.edu.tw/releaseRedirect.do?unitID=183&pageID=3177","http://163.23.175.5/LIB/LibView.aspx?11240"],
["雲林縣","國立斗六家商","http://www.tlhc.ylc.edu.tw","http://student.tlhc.ylc.edu.tw/school/","http://163.23.175.5/LIB/LibView.aspx?11232"],
["新北市","三重商工","http://www.scvs.ntpc.edu.tw/bin/home.php","http://www.scvs.ntpc.edu.tw/files/11-1000-90.php","http://163.23.175.5/LIB/LibView.aspx?11439"],
["新北市","中華商海","http://www.chmvs.tpc.edu.tw","http://www.chmvs.tpc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11557"],
["新北市","南強工商","http://www.ncvs.ntpc.edu.tw","http://www.ncvs.ntpc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11600"],
["新北市","能仁家商","http://www.nrvs.ntpc.edu.tw","http://www.nrvs.ntpc.edu.tw/library/index.htm","http://163.23.175.5/LIB/LibView.aspx?11415"],
["新北市","淡水商工","http://www.tsvs.ntpc.edu.tw","http://210.71.68.19/lib/web/index.php","http://163.23.175.5/LIB/LibView.aspx?11380"],
["新北市","莊敬高職","http://www.jjvs.ntpc.edu.tw","http://","http://163.23.175.5/LIB/LibView.aspx?11174"],
["新北市","復興商工","http://www.fhvs.ntpc.edu.tw","http://lib.fhvs.ntpc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11128"],
["新北市","智光商工","http://www.ckvs.ntpc.edu.tw","http://www.ckvs.ntpc.edu.tw/2j.asp?id=2&cid=31","http://163.23.175.5/LIB/LibView.aspx?11092"],
["新北市","開明工商","http://www.kmvs.tpc.edu.tw","http://210.70.203.24/","http://163.23.175.5/LIB/LibView.aspx?11304"],
["新北市","新北高工","http://www.ntvs.ntpc.edu.tw/bin/home.php","http://www.ntvs.ntpc.edu.tw/files/11-1000-102.php","http://163.23.175.5/LIB/LibView.aspx?11508"],
["新北市","瑞芳高工","http://www.jfvs.ntpc.edu.tw","http://210.59.2.4","http://163.23.175.5/LIB/LibView.aspx?11179"],
["新北市","穀保家商","http://www.kpvs.ntpc.edu.tw","http://www.kpvs.ntpc.edu.tw/files/90-1000-55.php","http://163.23.175.5/LIB/LibView.aspx?11400"],
["新北市","樹人家商","http://www.stgvs.ntpc.edu.tw","http://library.stgvs.ntpc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11289"],
["新北市","豫章工商","http://www.ycvs.ntpc.edu.tw","http://library.ycvs.ntpc.edu.tw:81","http://163.23.175.5/LIB/LibView.aspx?11410"],
["新北市","鶯歌工商","http://www.ykvs.ntpc.edu.tw","http://163.20.163.6/web/886","http://163.23.175.5/LIB/LibView.aspx?11122"],
["新竹市","新竹高工","http://www.hcvs.hc.edu.tw","http://www.hcvs.hc.edu.tw/lib/","http://163.23.175.5/LIB/LibView.aspx?11234"],
["新竹市","新竹高商","http://www.hccvs.hc.edu.tw","http://www.hccvs.hc.edu.tw/lib","http://163.23.175.5/LIB/LibView.aspx?11316"],
["新竹縣","內思高工","http://163.19.9.241/ischool/publish_page/0/","http://163.19.9.241/ischool/publish_page/31/","http://163.23.175.5/LIB/LibView.aspx?11567"],
["嘉義市","東吳工家","http://www.dwvs.cy.edu.tw","http://163.27.17.7","http://163.23.175.5/LIB/LibView.aspx?11387"],
["嘉義市","國立嘉義高商","http://www.cyvs.cy.edu.tw","http://163.27.6.5/~library/","http://163.23.175.5/LIB/LibView.aspx?11167"],
["嘉義市","華南高商","http://www.hnvs.cy.edu.tw","http://www.hnvs.cy.edu.tw/sub/news/index.asp?Parser=22,5,207,31","http://163.23.175.5/LIB/LibView.aspx?11526"],
["嘉義市","嘉義家職","http://www.cyhvs.cy.edu.tw","http://163.27.8.8","http://163.23.175.5/LIB/LibView.aspx?11162"],
["嘉義市","嘉義高工","http://www.cyivs.cy.edu.tw","http://admin.cyivs.cy.edu.tw/library/","http://163.23.175.5/LIB/LibView.aspx?11309"],
["嘉義縣","弘德工商","http://www.cdvs.cyc.edu.tw","http://www.cdvs.cyc.edu.tw/","http://163.23.175.5/LIB/LibView.aspx?11422"],
["嘉義縣","民雄農工","http://www.mhvs.cyc.edu.tw","http://163.27.22.5/~mhvs273/","http://163.23.175.5/LIB/LibView.aspx?11320"],
["嘉義縣","協同高中","http://www.cmsh.cyc.edu.tw/","http://lib.cmsh.cyc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11299"],
["嘉義縣","萬能工商","http://www.wnvs.cyc.edu.tw","http://www.wnvs.cyc.edu.tw","http://163.23.175.5/LIB/LibView.aspx?11548"],
["彰化縣","大慶商工","http://www.dcvs.chc.edu.tw","http://163.23.133.31","http://163.23.175.5/LIB/LibView.aspx?11326"],
["彰化縣","北斗家商","http://www.pthc.chc.edu.tw","http://www.pthc.chc.edu.tw/lib","http://163.23.175.5/LIB/LibView.aspx?11436"],
["彰化縣","永靖高工","http://www.yjvs.chc.edu.tw","http://163.23.155.146","http://163.23.175.5/LIB/LibView.aspx?11127"],
["彰化縣","員林家商","http://163.23.169.3/","http://163.23.169.3/web/lib/","http://163.23.175.5/LIB/LibView.aspx?11360"],
["彰化縣","員林農工","http://www.ylvs.chc.edu.tw","http://sites.google.com/site/ylvslib202/","http://163.23.175.5/LIB/LibView.aspx?11354"],
["彰化縣","國立二林工商","http://www.elvs.chc.edu.tw","http://www.elvs.chc.edu.tw/web/el380/","http://163.23.175.5/LIB/LibView.aspx?11120"],
["彰化縣","國立秀水高工","http://","http://","http://163.23.175.5/LIB/LibView.aspx?11184"],
["彰化縣","崇實高工","http://www.csvs.chc.edu.tw","http://163.23.168.9/web/library/","http://163.23.175.5/LIB/LibView.aspx?11271"],
["彰化縣","達德商工","http://www.tdvs.chc.edu.tw","http://www.tdvs.chc.edu.tw/dt10/index.aspx","http://163.23.175.5/LIB/LibView.aspx?11169"],
["彰化縣","彰化高商","http://w2.chsc.tw","http://w2.chsc.tw/?pageName=organization&appName=intro&subApp=patner&pid=9","http://163.23.175.5/LIB/LibView.aspx?11239"],
["彰化縣","彰師大附工","http://www.sivs.chc.edu.tw/bin/home.php","http://www.sivs.chc.edu.tw/files/40-1000-25.php","http://163.23.175.5/LIB/LibView.aspx?11353"],
["澎湖縣","澎湖海事","http://www.phmhs.phc.edu.tw","http://www.phmhs.phc.edu.tw/lib/","http://163.23.175.5/LIB/LibView.aspx?11221"],
];

save_to_ods = function (_title, _data) {
    // https://pulipulichen.github.io/jieba-js/xlsx.core.min.js
    
    if (typeof(XLSX) === "undefined") {
        $.getScript("https://pulipulichen.github.io/blog-pulipuli-info-data-2017/04/console-webpage-crawler/xlsx.core.min.js", function () {
        //$.getScript("xlsx.core.min.js", function () {
            $.getScript("https://pulipulichen.github.io/blog-pulipuli-info-data-2017/04/console-webpage-crawler/FileSaver.js", function () {
            //$.getScript("FileSaver.js", function () {
                save_to_ods(_data);
            });
        });
        return;
    }
    
    // --------------------
    
    if( Object.prototype.toString.call( _data[0] ) !== '[object Array]' ) {
        _data = convert_json_array_to_array(_data);
    }
    
    //console.log(_data);return;
    
    // --------------------
    
    var _sheet = {};
    var _sheet_cells = {};
    
    var _max_col_number = 0;
    for (var _row = 0; _row < _data.length; _row++) {
        if (_data[_row].length-1 > _max_col_number) {
            _max_col_number = _data[_row].length-1;
        }
        
        for (var _col = 0; _col < _data[_row].length; _col++) {
            var _key = WEBCRAWLER.get_alphabet_col(_col);
            
            _key = _key + (_row+1);
            
            var _value = _data[_row][_col];
            _sheet_cells[_key] = { v: _value };
        }
    }
    
    var _last_cell = WEBCRAWLER.get_alphabet_col(_max_col_number) + "" + _data.length;
    _sheet["!ref"] = "A1:" + _last_cell;
    for (var _key in _sheet_cells) {
        _sheet[_key] = _sheet_cells[_key];
    }
    
    // --------------------
    
    var workbook = {
        SheetNames: ['data'],
        Sheets: {
            'data': _sheet
        }
    };
    
    //console.log(_sheet);return;
    
    // -------------------------------------------
    
    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
    var _bookType = "xlsx";
    var wopts = { bookType:_bookType, bookSST:false, type:'binary' };

    var wbout = XLSX.write(workbook,wopts);

    /* the saveAs call downloads a file on the local machine */
    //var _title = document.title;
    //var today = new Date();
    //today = today.toISOString().substring(0, 10);
    //_title = _title + " (" + today + ")";
    
    saveAs(new Blob([WEBCRAWLER.s2ab(wbout)],{type:"application/octet-stream"}), _title + "." + _bookType);
};

WEBCRAWLER = {};

WEBCRAWLER.convert_json_array_to_array = function (_json_array) {
    
    var _key_array = [];
    var _value_array = [];
    
    for (var _i = 0; _i < _json_array.length; _i++) {
        var _line = [];
        var _j = 0;
        for (var _key in _json_array[_i]) {
            var _key_index = $.inArray(_key, _key_array);
            if ($.inArray(_key, _key_array) === -1) {
                _key_array.push(_key);
                _key_index = _key_array.length-1;
            }
            
            var _value = _json_array[_i][_key];
            _line[_key_index] = _value;
            if (_key_index !== _j) {
                _line[_j] = undefined;
            }
            _j++;
        }
        
        _value_array.push(_line);
    }
    
    // -------------------------------
    
    for (var _i = 0; _i < _value_array.length; _i++) {
        for (var _j = 0; _j < _key_array.length; _j++) {
            if (typeof(_value_array[_i][_j]) === "undefined") {
                _value_array[_i][_j] = undefined;
            }
        }
        //_array.push(_value_array[_i]);
    }
    
    // -------------------------------
    
    var _array = [];
    _array.push(_key_array);
    for (var _i = 0; _i < _value_array.length; _i++) {
        _array.push(_value_array[_i]);
    }
    
    return _array;
};

WEBCRAWLER.s2ab = function (s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!==s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
};
WEBCRAWLER.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
WEBCRAWLER.alphabet_array = WEBCRAWLER.alphabet.split("");
WEBCRAWLER.get_alphabet_col = function (_col) {
    var _key = "";
    var _is_over = false;
    
    while (_col > WEBCRAWLER.alphabet_array.length - 1) {
        _is_over = true;
        //console.log("over");
        var _i = _col % WEBCRAWLER.alphabet_array.length;
        var _v = WEBCRAWLER.alphabet_array[(_i)];
        _key = _v + _key;
        _col = (_col-_i) / WEBCRAWLER.alphabet_array.length;
    }

    var _i = _col % WEBCRAWLER.alphabet_array.length;
    if (_is_over === true) {
        _v = WEBCRAWLER.alphabet_array[(_i-1)];
    }
    else {
        _v = WEBCRAWLER.alphabet_array[(_i)];
    }
    
    _key = _v + _key;
    
    return _key;
};