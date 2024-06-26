import React, { useEffect } from 'react';
import { Application, Assets, Sprite, Texture } from 'pixi.js';
import HomepageHeader from '../components/homepageHeader';

const LifeQuest = () => {
    useEffect(() => {
        const initializeGame = async () => {
            // Create a new application
            const app = new Application();

            // Initialize the application
            await app.init({ resizeTo: window });

            // Load textures
            await Assets.load([
                'https://pixijs.com/assets/bg_button.jpg',
                'https://pixijs.com/assets/button.png',
                'https://pixijs.com/assets/button_down.png',
                'https://pixijs.com/assets/button_over.png',
            ]);

            // Create a background...
            const background = Sprite.from('https://pixijs.com/assets/bg_button.jpg');
            background.width = app.screen.width;
            background.height = app.screen.height;

            // Add background to stage...
            app.stage.addChild(background);

            // Create some textures from an image path
            const textureButton = Texture.from('https://pixijs.com/assets/button.png');
            const textureButtonDown = Texture.from('https://pixijs.com/assets/button_down.png');
            const textureButtonOver = Texture.from('https://pixijs.com/assets/button_over.png');

            const buttons = [];

            const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

            for (let i = 0; i < 5; i++) {
                const button = new Sprite(textureButton);

                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];

                // Make the button interactive...
                button.interactive = true;
                button.buttonMode = true;

                button
                    .on('pointerdown', onButtonDown)
                    .on('pointerup', onButtonUp)
                    .on('pointerupoutside', onButtonUp)
                    .on('pointerover', onButtonOver)
                    .on('pointerout', onButtonOut);

                // Add it to the stage
                app.stage.addChild(button);

                // Add button to array
                buttons.push(button);
            }

            // Set some silly values...
            buttons[0].scale.set(1.2);
            buttons[2].rotation = Math.PI / 10;
            buttons[3].scale.set(0.8);
            buttons[4].scale.set(0.8, 1.2);
            buttons[4].rotation = Math.PI;

            function onButtonDown() {
                this.isdown = true;
                this.texture = textureButtonDown;
                this.alpha = 1;
            }

            function onButtonUp() {
                this.isdown = false;
                if (this.isOver) {
                    this.texture = textureButtonOver;
                } else {
                    this.texture = textureButton;
                }
            }

            function onButtonOver() {
                this.isOver = true;
                if (this.isdown) {
                    return;
                }
                this.texture = textureButtonOver;
            }

            function onButtonOut() {
                this.isOver = false;
                if (this.isdown) {
                    return;
                }
                this.texture = textureButton;
            }

            // Append the application canvas to the referenced div
            const container = document.getElementById('game-container');
            container.appendChild(app.view);
        };

        initializeGame();

        // Cleanup function
        return () => {
            // Destroy PixiJS application when component unmounts
            Application.destroy(true);
        };
    }, []);

    return (
        <>
            <HomepageHeader /> 
            <div id="game-container" />
        </>
    );
};

export default LifeQuest;