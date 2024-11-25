/**
 * ファイルを開いたときのイベントハンドラ
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('Op');  // Uiクラスからメニューを作成する
  menu.addItem('autosort', 'autosort');   // メニューにアイテムを追加する
  menu.addToUi();                            // メニューをUiクラスに追加する
}

function onClickItem1() {
  Browser.msgBox('アイテム1がクリックされました。');
}

function autosort() {
  var ss        = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sortRange = "B1:J";
  var range     = ss.getRange(sortRange);
  var sortOrder = [
                  {column: 4, ascending: true},
                  {column: 7, ascending: true},
                  {column: 8, ascending: true},
                  {column: 9, ascending: true},
                  {column: 3, ascending: true}
                  ];

  range.sort(sortOrder);
}

function get_row_CUI() {
  YKLiba.Log.set_log_level(YKLiba.Log.DEBUG);

  const env = get_env();
  env.sheet_name = "Sheet1";
  env.header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
  const v = YKLiba.get_data_as_records_with_header(env);
  YKLiba.Log.debug(v);
}
function get_account_records_september_CUI() {
  const env = get_env();
  env.sheet_name = "9月支払い分";
  // [ss, sheet, sheets, sheets_by_name] = YKLiba.get_spreadsheet_ex(env.ss_id, env.sheet_name);
  // const sheetx = sheets_by_name[env.sheet_name];
  [ss, sheet] = YKLiba.get_spreadsheet(env.ss_id, env.sheet_name);

  const v = get_account_records(sheet);
  YKLiba.Log.debug(v);
}
function get_account_records_september_2_CUI() {
  const env = get_env();
  env.sheet_name = "9月支払い分_";
  // [ss, sheet, sheets, sheets_by_name] = YKLiba.get_spreadsheet_ex(env.ss_id, env.sheet_name);
  // const sheetx = sheets_by_name[env.sheet_name];
  [ss, sheet] = YKLiba.get_spreadsheet(env.ss_id, env.sheet_name);
  const v = get_account_records(sheet);
  YKLiba.Log.debug(v);
}
function get_account_records_october_CUI() {
  const env = get_env();
  env.sheet_name = "10月支払い分";
  [ss, sheet, sheets, sheets_by_name] = YKLiba.get_spreadsheet_ex(env.ss_id, env.sheet_name);
  const sheetx = sheets_by_name[env.sheet_name];
  const v = get_account_records(sheet);
  YKLiba.Log.debug(v);
}
function get_account_records_october_2_CUI() {
  const env = get_env();
  env.sheet_name = "10月支払い分_";
  [ss, sheet, sheets, sheets_by_name] = YKLiba.get_spreadsheet_ex(env.ss_id, env.sheet_name);
  const sheetx = sheets_by_name[env.sheet_name];
  const v = get_account_records(sheet);
  YKLiba.Log.debug(v);
}
function get_account_records(sheet) {
  const range = YKLiba.get_valid_range(sheet);
  [rows, column, height, width ] = YKLiba.getRangeShape(range);
  YKLiba.Log.debug(`rows=${rows} column=${column} height=${height} width=${width}`);

  const values = range.getValues();
  let start = 0;
  if( values[start][0] !== null ){
    YKLiba.Log.debug(`${values[start][0]}`)
    const str = `${values[start][0]}`.trim();
    if (str === ""){
      values.shift();
    }
  }
  const array = values.map( item => {
    return{ 
      date: item[0],
      price: item[1], 
      name: item[2] }
    }
  );

  return array;
}

function get_record_by_header(sheet, header){
  // header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
  [range, values] = YKLiba.get_range_and_values(sheet);
  const buffer = [];
  if (range !== null && values !== null){
    // YKLiba.Log.debug( [range, values])
    let index = 0;

    for (const item of values){
      // YKLiba.Log.debug( item );
      const hash = {};
      for(let i = 0; i<header.length; i++){
        index = i + 1;
        hash[ header[i] ] = item[index];
      }
      // YKLiba.Log.debug( hash );

      buffer.push(hash);
    }
    // YKLiba.Log.debug( buffer[0] );
  }
  // YKLiba.Log.debug( buffer[0] );
  return buffer;
}

function get_rows(sheet) {
  [range, values] = YKLiba.get_range_and_values(sheet);
  const buffer = [];
  if (range !== null && values !== null){
    // YKLiba.Log.debug( [range, values])
    let index = 0;
    keys = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];

    let hash;
    for (const item of values){
      // YKLiba.Log.debug( item );
      hash = {};
      for(let i = 0; i<keys.length; i++){
        index = i + 1;
        hash[ keys[i] ] = item[index];
      }
      // YKLiba.Log.debug( hash );

      buffer.push(hash);
    }
    // YKLiba.Log.debug( buffer[0] );
  }
  // YKLiba.Log.debug( buffer[0] );
  return buffer;
}
