const gamePlay = {
    key: 'gamePlay',
    preload: function(){

        this.load.image('bg1','images/bg/bg1.png');
        this.load.image('bg2','images/bg/bg2.png');
        this.load.image('bg3','images/bg/bg3.png');
        this.load.image('bg4','images/bg/bg4.png');
        this.load.image('footer',' images/bg/footer.png');
        this.load.spritesheet('user', 'images/player.png', {frameWidth: 144, frameHeight: 120});
    },
    create: function(){
        // 資源載入完成，加入遊戲物件及相關設定
        this.bg4 = this.add.tileSprite(w/2, h/2, w, h, 'bg4');
        this.bg3 = this.add.tileSprite(w/2, h/2, w, h, 'bg3');
        this.bg2 = this.add.tileSprite(w/2, h/2, w, h, 'bg2');
        this.bg1 = this.add.tileSprite(w/2, h/2, w, h, 'bg1');
        this.footer = this.add.tileSprite(w/2, 360+45, w, 90, 'footer');
        this.physics.add.existing(this.footer);
        // 設定物件不會動靜止不會掉下去
        this.footer.body.immovable = true;
        // 物件的位置和旋轉是否受其速度，加速度，阻力和重力的影響
        this.footer.body.moves = false;
        //設定人物位置
        this.player = this.physics.add.sprite(150, 150, 'user');
        this.player.setScale(0.7);
        //將需要碰撞的物件綁在一起
        this.physics.add.collider(this.player, this.footer);
        //設定角色彈跳值
        this.player.setBounce(1);
        //設定邊界，不讓他超出邊界
        this.player.setCollideWorldBounds(true);
        //設定角色碰撞邊界
        this.player.setSize(100, 100);
        //設定動畫播放
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1//1==執行一次  -1==無限循環
        })
        //加速度
        this.anims.create({
            key: 'speed',
            frames: this.anims.generateFrameNumbers('user', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1//1==執行一次  -1==無限循環
        })
        //播放動畫
        this.player.anims.play('run', true);
    },
    update: function(){
        // 遊戲狀態更新
        this.bg4.tilePositionX += 4;
        this.bg3.tilePositionX += 3;
        this.bg2.tilePositionX += 2;
        this.bg1.tilePositionX += 1;
        this.footer.tilePositionX += 4;
        //滑鼠監聽事件
        const keyboard = this.input.keyboard.createCursorKeys()
        if(keyboard.right.isDown){
            this.player.anims.play('speed', true);
            this.player.flipx = false;//角色翻轉
            this.player.setVelocityX(200);
        }
        else if(keyboard.left.isDown){
            this.player.anims.play('speed', true);
            this.player.flipx = true;
            this.player.setVelocityX(-260);
        }
        else{
            this.player.anims.play('run', true);
            this.player.flipx = false;
            this.player.setVelocityX(0);
        }
        if(keyboard.up.isDown){
            console.log('up');
        }
    }
}