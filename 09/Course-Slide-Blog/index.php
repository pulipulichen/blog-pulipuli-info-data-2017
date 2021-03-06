<?php
include 'config.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Google Drive File Download Link Generator</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="style.css" />
        
<link rel="stylesheet" href="//pulipulichen.github.io/blogger/posts/2016/12/semantic/semantic.min.css" />
<link rel="stylesheet" href="http://fontawesome.io/assets/font-awesome/css/font-awesome.css" />

<link rel="icon" type="image/png" href="icon.png" sizes="16x16">
<link rel="icon" type="image/png" href="icon.png" sizes="32x32">
<link rel="icon" type="image/png" href="icon.png" sizes="96x96">

    </head>
    <body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="//pulipulichen.github.io/blogger/posts/2016/12/semantic/semantic.min.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/sisyphus.js/1.1.3/sisyphus.min.js'></script>

<script src="script.js"></script>

<!-- ------------------------------------------------------------ -->

<link rel="stylesheet" href="//pulipulichen.github.io/blogger/posts/2016/12/semantic/semantic.min.css">
<link rel="stylesheet" href="http://fontawesome.io/assets/font-awesome/css/font-awesome.css">
<script src="//pulipulichen.github.io/blogger/posts/2016/12/semantic/semantic.min.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script src="//pulipulichen.github.io/blogger/posts/2016/12/clipboard.min.js"></script>
<script src="//pulipulichen.github.io/blogger/posts/2016/12/puli-util.clipboard.js"></script>

<!-- ------------------------------------ -->

<form class="file-process-framework ui form" id="file_process_framework">

  <div class="ui two column doubling grid">
    <div class="column">
	<div class="ui segment">
	
    
<h1 class="ui horizontal divider header">
    Input <input type="reset" value="reset" onclick="setTimeout(function(){location.reload();},500)" />
</h1>


<!-- --------------------------------- -->

<div class="ui bottom attached active tab segment input-field-container" data-tab="textarea">
  <div class="field" style="display:none;">
    <label for="input_mode_textarea">Paste text here: </label>
    <textarea class="input-mode textarea" id="input_mode_textarea" onfocus="this.select()" style="display:none;" name="input_mode_textarea"></textarea>
  </div>
  
    <div class="field">
        <label for="input_title">
            Title: 
            <a href="<?php echo $CONFIG["demo_page"]; ?>" target="_blank">參考網頁</a>
            <a href="<?php echo $CONFIG["google_drive"]; ?>" target="_blank">[Google Drive]</a>
            <a href="<?php echo $CONFIG["outline"]; ?>" target="_blank">[課程大綱]</a>
        </label>
        <input type="text" class="input_title input-field change-event" id="input_title" name="input_title"  value="[CHI] / [ENG]" />
    </div>

  <!--
  <div class="ui two column  doubling grid">
	<div class="column">
		  <div class="field">
			<label for="textarea1">
				Bibliography: 
			</label>
			<textarea class="mceEditor textarea input-field field-value" id="textarea1" onfocus="this.select()"></textarea>
		  </div>

	</div>
	<div class="column">
		<div class="field">
			<label for="textarea2">
				Author:
			</label>
			<textarea class="mceEditor textarea input-field field-value change-event" id="textarea2" onfocus="this.select()"></textarea>
		</div>
	</div>
  </div>
  <div class="ui two column  doubling grid">
	<div class="column">
		  <div class="field">
			<label for="textarea3">
				Abstract:
			</label>
			<textarea class="mceEditor textarea input-field field-value change-event" id="textarea3" onfocus="this.select()"></textarea>
		  </div> 
	</div>
	<div class="column">
		  <div class="field">
			<label for="textarea4">
				Note:
			</label>
			<textarea class="mceEditor field-value textarea input-field change-event" id="textarea4" onfocus="this.select()"></textarea>
		  </div> 
	</div>
  </div>
	-->
  <!-- <div class="ui three column  doubling grid"> -->
  
  <div class="ui two column doubling grid">
	<div class="column">
            檢查事項
            <?php echo file_get_contents('checklist.html'); ?>
		  <table class="ui table">
		
		<tr>
			<th>
                            Google Drive:
                            <button type="button" class="copy-attr" data-copy-attr="Google Drive (NCCU)">
                                    Copy
                            </button>
                            <a href="https://docs.google.com/presentation/d/1TuB-5CmJ7Vpa-Wz2yIt-FNk7lgsF8EJwqLxINr7cUuw/edit#slide=id.g1ce8cf009e_0_16" target="_blank">首頁樣板</a>
			</th>
			<td>
				
                            <input type="text" id="fdf2" class="googledrive change-event  field-value" name="fdf2" value="" />
			</td>
		</tr>
                <tr style="display: none;">
			<th>
				Year:
			</th>
			<td>
				<input type="text" id="year" class="change-event field-value" value="今" />
			</td>
		</tr>
		<tr style="display: none;">
			<th>
				 Month:
			</th>
			<td>
				<input type="text" id="month" class="change-event field-value" value="" />
			</td>
		</tr>
		<tr style="display: none;">
			<th>
				 Place:
			</th>
			<td>
				<input type="text" id="place" class="change-event field-value" value="" />
			</td>
		</tr>
		<tr>
			<th>
				 Iframe:
				<button type="button" class="copy-ele-value" data-copy-ele-value="#iframe1">Copy</button>
			</th>
			<td>
				<input type="text" id="iframe1" name="iframe1" onfocus="this.select()" />
			</td>
		</tr>
            </table>
            <table class="ui table">
                <tr>
			<th>
                           Link to Iframe:
                           <button type="button" class="link-to-iframe" >Copy</button>
			</th>
			<td>
                            <input type="text" id="link_to_iframe" name="link_to_iframe" onfocus="this.select()" />
			</td>
		</tr>
                <tr>
			<th>
                           Local file path to GitHub:
                           <button type="button" class="path-to-github" >Copy</button>
			</th>
			<td>
                            <input type="text" id="path_to_github" name="path_to_github" onfocus="this.select()" />
			</td>
		</tr>
	  </table>
            <div class="field"  style="display: none;">
                <label for="file_list">
                    File List
                </label>
                <textarea id="file_list" class="change-event field-value mceEditor"></textarea>
            </div>
	</div>
	<div class="column" id="cloud_files">
            <table class="ui table">
		<tr>
			<th>
                            GitHub:
                            <button type="button" class="copy-attr" data-copy-attr="<?php echo $CONFIG["github_path"]; ?>">
                                    Copy Dir Path
                            </button>
			</th>
			<td>
				
				<input type="text" id="fdf1" name="fdf1" class="github change-event field-value" value="" placeholder="File Path..." />
			</td>
		</tr>
		<tr>
			<th>
				<a href="http://l.pulipuli.info/u/onedrive" target="onedrive">OneDrive:</a>
			</th>
			<td>
				<input type="text" id="fdf3" name="fdf3" value="" class="change-event field-value" />
			</td>
		</tr>
		<tr>
			<th>
				<a href="http://l.pulipuli.info/u/box" target="box">Box:</a>
			</th>
			<td>
				
				<input type="text" id="fdf4" name="fdf4" value="" class="change-event field-value" />
			</td>
		</tr>
		<tr>
			<th>
				<a href="http://l.pulipuli.info/u/mega" target="mega">Mega:</a>
			</th>
			<td>
				<input type="text" id="fdf5" name="fdf5" value="" class="change-event field-value" />
			</td>
		</tr>
		<tr>
			<th>
				<a href="http://l.pulipuli.info/u/mediafire" target="mediafire">MediaFire:</a>
			</th>
			<td>
				
                            <input type="text" id="fdf6" name="fdf6" value="" class="change-event field-value" />
			</td>
		</tr>
		<tr>
			<th>
				<a href="https://www.slideshare.net/upload" target="slideshare">SlideShare:</a>
			</th>
			<td>
				
				<input type="text" id="fdf7" name="fdf7" value="" class="change-event field-value" />
			</td>
		</tr>
                <tr>
			<th>
				<a href="http://l.pulipuli.info/u/google-drive-nccu" target="google-drive-for-edu">Google Drive for Edu</a>
			</th>
			<td>
				
				<input type="text" id="fdf8" name="fdf8" value="" class="change-event field-value" />
			</td>
		</tr>
	  </table>

	</div>
  </div>
  
  
  <!-- --------------------------------- -->
  
  
  <!-- --------------------------------- -->
  
  
  <div class="field">
	<label for="template">
		Template:
	</label>
	<textarea class="template mceEditor textarea input-field change-event" id="template" name="template" onfocus="this.select()"><?php 
echo file_get_contents("template.html");
?></textarea>
  </div> 
      
</div>

<!-- -------------------------------------- -->
    
  <div class="field">
    <div class="loading hide"><img src="loading.gif" /></div>
  </div> <!-- <div class="field"> -->
  
		</div> <!-- <div class="ui segment"> -->
	</div> <!-- <div class="column"> -->
  <!-- -------------------------------------- -->
  
    <div class="column">
  <div class="ui segment display-result" style="">
  <!-- <div class="display-result"> -->
  
    <h2 class="ui horizontal divider header">
      Result
    </h2>
    <div class="field" style="display: none;">
      <button type="button" class="fluid ui large right labeled icon green button download-file">
        <i class="right download icon"></i>
        DOWNLOAD
      </button>
    </div>

    <div class="field">
      <label for="output_folder">
		Folder:
		<button type="button" class="copy-ele-value" data-copy-ele-value="#output_folder">Copy</button>
		[<a href="blog cover image template.pptx">Cover Image PPTX</a>], 
		[<a href="http://www.rollip.com/wizard/upload" target="Rollip">Rollip</a>],
		[<a href="https://www.photovisi.com/photovisi/piling-them-up" target="Mashup">Photo Mashup</a>],
		[<a href="https://ifttt.com/applets/2497993d-blogger-facebook#card" target="ifttt1">IFTTT1</a>],
		[<a href="https://ifttt.com/applets/4948871d-blogger#card" target="ifttt2">IFTTT2</a>],
	  </label>
      <input type="text" onfocus="this.select()" id="output_folder" class="output_folder" style="width: calc(100% - 15em)" />
    </div>
	
    <div class="field">
      <label for="output_title">
		Title: 
		<button type="button" class="copy-ele-value" data-copy-ele-value="#output_title">Copy</button>
		(Tag: 
			<?php
                        foreach ($CONFIG["tags"] AS $key => $value) {
                            ?>
                            <button type="button" class="copy-attr" data-copy-attr="<?php echo $value; ?>">
				<?php echo $key; ?>
                            </button>
                            <?php
                        }
                        ?>
		)
	  </label>
      <input type="text" onfocus="this.select()" id="output_title" class="output_title" style="width: calc(100% - 15em)" />
    </div>
	    
    <div class="field">
      <label for="preview">
        Result Preview: 
        <button type="button" id="copy_source_code">Copy Source Code</button>

        <div class="ui pointing below  medium blue basic label encoding" style="margin-left: 1em; display: none;">
            Get error encoding text? 
            <a href="http://blog.pulipuli.info/2016/12/utf-8notepad-how-to-convert-plain-text.html" target="notepad" >
                Try to Convert TXT file to UTF8 encoding?
            </a>
        </div>
      </label>
        
      <textarea id="preview" class="preview" onfocus="this.select();"></textarea>
    </div>
	
    <div id="preview_html" class="ui segment" ></div>
  
  </div>
    </div> <!-- <div class="column"> -->
  </div> <!-- <div class="ui two column doubling grid"> -->
</form>

<!-- ------------------------------------------------------------ -->
<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-37178375-7', 'auto');
ga('send', 'pageview');</script>


<script>
$("#file_process_framework").sisyphus();
</script>

    </body>
</html>
