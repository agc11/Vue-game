new Vue({
  el:'#app',
  data: {
    playerHealth:  100,
    monsterHealth: 100,
    playerAttack:  10,
    monsterAttack: 12,
    gameIsRunning: false,
    turnsLog:      [],
  },
  methods: {
    startNewGame: function() {
      this.playerHealth  = 100
      this.monsterHealth = 100
      this.gameIsRunning = true
      this.turnsLog      = []
    },
    attack: function(characterAttaking, maxAttack, minAttack) {
      const damage = this.calculateAttack(maxAttack, minAttack)
      this.turnLog(true, damage, characterAttaking)

      if (characterAttaking === 'player') {
        this.monsterHealth -= damage
        this.monsterAttacks()
      } else {
        this.playerHealth  -= damage
      }
    },
    normalAttack: function() {
      this.attack('player', this.playerAttack, 3)
    },
    specialAttack: function() {
      this.attack('player', 20, 10)
    },
    heal: function() {
      this.playerHealth = (this.playerHealth >= 90)
                            ? 100
                            : this.playerHealth + 10
      this.turnLog(false)
      this.monsterAttacks()
    },
    giveUp: function() {
      this.gameIsRunning = false
    },
    monsterAttacks: function() {
      this.attack('monster', this.monsterAttack, 5)
    },
    calculateAttack: function(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    turnLog: function(isAttack, damage = 0, player = 'player') {
      let text
      if (isAttack) {
        const attacker = (player === 'player') ? 'Player' : 'Monster'
        const defender = (player !== 'player') ? 'Player' : 'Monster'
        text           = attacker + ' hits ' + defender + ' for ' + damage
      } else {
        text           = 'Player heals 10 points'
      }

      this.turnsLog = this.turnsLog.concat(
                                      [{
                                          isPlayer: (player === 'player'),
                                          text:     text
                                      }])
    },
  },
  watch: {
    playerHealth: function() {
      if (this.playerHealth <= 0 && this.gameIsRunning) {
        this.gameIsRunning = false
        alert('You Lost!')
      }
    },
    monsterHealth: function() {
      if (this.monsterHealth <= 0 && this.gameIsRunning) {
        this.gameIsRunning = false
        alert('You Win!')
      }
    }
  }
})
