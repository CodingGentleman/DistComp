class StatsController {
    constructor(backendService, persistenceService, anotherRoundCallback) {
        if(backendService === undefined)
            throw Error("BackendService may not be undefined");
        if(persistenceService === undefined) 
            throw Error("PersistenceService may not be undefined");
        if(anotherRoundCallback === undefined)
            throw Error("anotherRoundCallback may not be undefined");

        this.backendService = backendService;
        this.persistenceService = persistenceService;
        this.anotherRoundCallback = anotherRoundCallback;

        this.currentUser = persistenceService
            .loadFromLocalStorage('lastUsername');

        this.backendService.registerOnNewResults((results) => this.display(results));
    }

    display(results) {
        this.currentUser = this.persistenceService
            .loadFromLocalStorage('lastUsername');
        renderStats(this.currentUser, results);
        this.initialize();
    }

    initialize() {
        var self = this;
        /* User clicks Another-Round-Button */
        $('.js-again-button').on("click", function() {
            self.anotherRound();
        });
    }

    anotherRound() {
        var username = this.persistenceService
            .loadFromLocalStorage('lastUsername');
        this.backendService.tryLogin(username);
        this.anotherRoundCallback();
    }
}
