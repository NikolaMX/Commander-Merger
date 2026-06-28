// Lobby faction coloring for the merged commanders.
// bugCommanders / legionCommanders are defined once in commander-merge.js
// (loaded first, same scene scope); reuse them here so the picker filtering
// and the coloring can't drift apart. Assimilation has no shared list, so it
// is defined locally.

var assimCommanders = [
    "/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json",
    "/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json"
];

//bugs commander picker colouring
loadCSS(
    "coui://ui/mods/commander_merge/css/faction_commander_picker.css"
);

model.isBugs = function (commander) {
    return _.includes(bugCommanders, commander);
};

model.isLegion = function (commander) {
    return _.includes(legionCommanders, commander);
};

model.isAssim = function (commander) {
    return _.includes(assimCommanders, commander);
};

model.isCustomFaction = function (commander) {
    return (model.isBugs(commander) || model.isLegion(commander) || model.isAssim(commander));
};

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
