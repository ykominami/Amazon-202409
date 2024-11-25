function make_env_CUI(){
  const message = YKLiba.make_funcion_get_env();
  Logger.log(message);
}
function make_env_GUI(){
  const message = YKLiba.make_funcion_get_env();
  YKLiba.display_alert(message);
}
