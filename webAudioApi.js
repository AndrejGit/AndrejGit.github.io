var webAudio = {

    context: new AudioContext(),
    audioEnabled: false,

    getTime: function() {
        return this.context.currentTime;
    },

    enableAudio: function() {
        this.context.resume();
        this.audioEnabled = true;
    }
}
