var legionCommanders = [  "/pa/units/commanders/l_overwatch/l_overwatch.json",
"/pa/units/commanders/l_cyclops/l_cyclops.json",
"/pa/units/commanders/l_cataphract/l_cataphract.json",
"/pa/units/commanders/l_raptor/l_raptor.json",
"/pa/units/commanders/l_quad/l_quad.json",
"/pa/units/commanders/l_tank/l_tank.json"]
var bugCommanders = ["/pa/units/commanders/bug_commander/bug_commander.json"]

var replicateCommanders = ["/pa/units/commanders/replicate_commander_1/replicate_commander_1.json"]

var exileCommanders = ["/pa/units/commanders/exiles_blueberry/exiles_blueberry.json",
  "/pa/units/commanders/exiles_maxim/exiles_maxim.json",
  "/pa/units/commanders/exiles_brainiac/exiles_brainiac.json",
  "/pa/units/commanders/exiles_taurus/exiles_taurus.json"

]

//matches mod identifiers with commanders to add to the list
var modCommanders = {
    "com.pa.ferretmaster.bugs": bugCommanders,
    "com.pa.ferretmaster.bugs-dev": bugCommanders,
    "com.pa.legion-expansion-server": legionCommanders,
    "com.pa.legion-expansion-server-dev": legionCommanders,
    "pa.mla.unit.replicate": replicateCommanders,
    "com.pa.nik.exiles":exileCommanders,
    "com.pa.nik.exiles_dev":exileCommanders,
    "com.pa.assimilation-expansion-server": ["/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json","/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json"],
    "com.pa.ferretmaster.scenario-server-local":["/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json","/pa/units/commanders/scenario_invincible_com/scenario_invincible_com.json"],
    "com.pa.ferretmaster.scenario-server":["/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json"]
}

commandersToRemove = [
"/pa/units/commanders/exiles_blueberry/exiles_blueberry.json",
 "/pa/units/commanders/exiles_maxim/exiles_maxim.json",
"/pa/units/commanders/exiles_brainiac/exiles_brainiac.json",
"/pa/units/commanders/exiles_taurus/exiles_taurus.json",
"/pa/units/commanders/replicate_commander_1/replicate_commander_1.json",
"/pa/units/commanders/bug_commander/bug_commander.json",
"/pa/units/commanders/l_overwatch/l_overwatch.json",
"/pa/units/commanders/l_cyclops/l_cyclops.json",
"/pa/units/commanders/l_cataphract/l_cataphract.json",
"/pa/units/commanders/l_raptor/l_raptor.json",
"/pa/units/commanders/l_quad/l_quad.json",
"/pa/units/commanders/l_tank/l_tank.json",
"/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json",
"/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json",
"/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json"
]

var trackedFactionCommanders = commandersToRemove.slice();

commanderImageMap = {
  "/pa/units/commanders/exiles_blueberry/exiles_blueberry.json": "coui://pa/units/commanders/exiles_blueberry/profile_exiles_blueberry.png",
  "/pa/units/commanders/replicate_commander_1/replicate_commander_1.json":"coui://pa/units/commanders/replicate_commander_1/profile_rep_1.png",
  "/pa/units/commanders/bug_commander/bug_commander.json":"coui://pa/units/commanders/bug_commander/profile_bug.png",
  "/pa/units/commanders/l_cataphract/l_cataphract.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_cataphract.png",
  "/pa/units/commanders/l_raptor/l_raptor.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_raptor.png",
  "/pa/units/commanders/l_quad/l_quad.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_quad.png",
  "/pa/units/commanders/l_tank/l_tank.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_tank.png",
  "/pa/units/commanders/l_overwatch/l_overwatch.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_overwatch.png",
  "/pa/units/commanders/l_cyclops/l_cyclops.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_cyclops.png", 
  "/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json":"coui://ui/main/shared/img/commanders/profiles/profile_quad_not_armalisk.png",
  "/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json":"coui://ui/main/shared/img/commanders/profiles/profile_quad_donut_duke.png",
  "/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json":"coui://pa/units/commanders/scenario_ai_invincible_com/profile_bug.png"
}

_.defer(function () {
var modsPromise = api.mods.getMounted("server",true)// grabbing the list of mounted mods

modsPromise.then(function(result){ // setting which commanders to add
  var commandersToKeep = [];
  var bugsEnabled = false;
  for(modIndex in result){
    var modObject =  result[modIndex];
    if(modObject.identifier == "com.pa.ferretmaster.bugs" || modObject.identifier == "com.pa.ferretmaster.bugs-dev"){bugsEnabled = true}
    if(modCommanders[modObject.identifier] !== undefined){
      commandersToKeep = commandersToKeep.concat(modCommanders[modObject.identifier]);
    }
  }
  if(bugsEnabled){model.localChatMessage(loc("Bug Faction"),loc("To play as the Bugs select one of the green Commanders."))}

  var applyFilter = function () { filterUnsupportedCommanders(commandersToKeep); };

  // Apply now (the commander list may already be loaded)...
  applyFilter();
  // ...again whenever the engine (re)loads the commander list...
  if (typeof CommanderUtility !== "undefined" && _.isFunction(CommanderUtility.afterCommandersLoaded)) {
    CommanderUtility.afterCommandersLoaded(applyFilter);
  }
  // ...and if the lobby repopulates the observable later.
  if (_.isFunction(model.commanders) && _.isFunction(model.commanders.subscribe)) {
    model.commanders.subscribe(applyFilter);
  }

})

})
function filterUnsupportedCommanders(commandersToKeep) {
  var allowedFactionCommanders = {};
  _.forEach(commandersToKeep, function(commander) {
    allowedFactionCommanders[commander] = true;
  });

  function isAllowedCommander(commander) {
    return !_.includes(trackedFactionCommanders, commander) || allowedFactionCommanders[commander];
  }

  function filterObservable(observable) {
    if (!_.isFunction(observable)) {
      return;
    }

    var currentCommanders = observable();
    if (!_.isArray(currentCommanders) || !currentCommanders.length) {
      return;
    }

    var filteredCommanders = _.filter(currentCommanders, isAllowedCommander);
    // Only write when something changed, so re-running from the observable's
    // own subscription can't trigger an endless update loop.
    if (filteredCommanders.length !== currentCommanders.length) {
      observable(filteredCommanders);
    }
  }

  filterObservable(model.commanders);
  filterObservable(model.aiCommanders);

  if (_.isFunction(model.commanders) && _.isFunction(model.selectedCommander) && _.isFunction(model.selectedCommanderIndex)) {
    var selectedCommander = model.selectedCommander();
    if (selectedCommander && !isAllowedCommander(selectedCommander)) {
      model.selectedCommanderIndex(-1);
      // selectedCommander() now resolves to an allowed fallback; notify the
      // server so its slot state doesn't keep the unsupported commander.
      if (_.isFunction(model.send_message) && !(_.isFunction(model.thisPlayerIsReady) && model.thisPlayerIsReady())) {
        model.send_message('update_commander', { commander: model.selectedCommander() });
      }
    }
  }
}






