var bugCommanders = [
    "/pa/units/commanders/bug_commander/bug_commander.json"
   
];

var assimCommanders = [
    "/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json",
    "/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json"
]

var legion = {};
var exileCommanders = ["/pa/units/commanders/exiles_blueberry/union_formidable.json"]
legion.commanders = [
  "/pa/units/commanders/l_overwatch/l_overwatch.json",
  "/pa/units/commanders/l_cyclops/l_cyclops.json",
  "/pa/units/commanders/l_cataphract/l_cataphract.json",
  "/pa/units/commanders/l_raptor/l_raptor.json",
  "/pa/units/commanders/l_quad/l_quad.json",
  "/pa/units/commanders/l_tank/l_tank.json"
];


  
  //bugs commander picker colouring
  loadCSS(
    "coui://ui/mods/commander_merge/css/faction_commander_picker.css"
  );

  model.isBugs = function (commander) {

    return _.includes(bugCommanders, commander);
  };

  model.isLegion = function (commander) {

    return _.includes(legion.commanders, commander);
  };

  model.isAssim = function (commander) {
    return _.includes(assimCommanders, commander);
  }

  model.isCustomFaction = function (commander) {
        return (model.isBugs(commander) || model.isLegion(commander) || model.isAssim(commander))
  }

   //Style Commander Picker Bugs
   $("#commander-picker .div-commander-picker-item.btn_std_ix").attr(
    "data-bind",
    "css: {bugsCommander: model.isBugs($data), legioncommander: model.isLegion($data), assimCommander: model.isAssim($data)},  click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'"
  );
  $("#ai-commander-picker .div-commander-picker-item.btn_std_ix").attr(
    "data-bind",
    "css: {bugsCommander: model.isBugs($data), legioncommander: model.isLegion($data), assimCommander: model.isAssim($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'"
  );

  //Style Slot Bugs
  $(".slot-player").attr(
    "data-bind",
    "css: {bugsSlot: !$data.isEmpty() && model.isBugs($data.commander()),assimSlot: !$data.isEmpty() && model.isAssim($data.commander()), mlaslot: !$data.isEmpty() && !model.isCustomFaction($data.commander()),legionslot: !$data.isEmpty() && model.isLegion($data.commander()), ready: isReady, loading: isLoading}"
  );
