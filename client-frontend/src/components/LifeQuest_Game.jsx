import React, { useEffect, useRef } from 'react';
import { Application, Assets, Sprite } from '@pixi/react';

const LifeQuestGame = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const initPixiApp = async () => {
            // Create a new PixiJS application
            const app = new Application({
                resizeTo: window,
                backgroundColor: 0x1099bb,
            });

            // Append the application canvas to the gameRef element
            if (gameRef.current) {
                gameRef.current.appendChild(app.view);
            } else {
                console.error("gameRef.current is null");
                return;
            }

            // Load textures
            const [bgTexture, buttonTexture, buttonDownTexture, buttonOverTexture] = await Assets.load([
                'https://pixijs.com/assets/bg_button.jpg',
                'https://pixijs.com/assets/button.png',
                'https://pixijs.com/assets/button_down.png',
                'https://pixijs.com/assets/button_over.png',
            ]);

            // Create a background
            const background = new Sprite(bgTexture);
            background.width = app.screen.width;
            background.height = app.screen.height;
            app.stage.addChild(background);

            // Create some textures from the loaded assets
            const buttons = [];
            const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

            for (let i = 0; i < 5; i++) {
                const button = new Sprite(buttonTexture);
                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];

                button.eventMode = 'static';
                button.cursor = 'pointer';

                button
                    .on('pointerdown', () => onButtonDown(button, buttonDownTexture))
                    .on('pointerup', () => onButtonUp(button, buttonTexture, buttonOverTexture))
                    .on('pointerupoutside', () => onButtonUp(button, buttonTexture, buttonOverTexture))
                    .on('pointerover', () => onButtonOver(button, buttonOverTexture))
                    .on('pointerout', () => onButtonOut(button, buttonTexture));

                app.stage.addChild(button);
                buttons.push(button);
            }

            // Set some values for buttons
            buttons[0].scale.set(1.2);
            buttons[2].rotation = Math.PI / 10;
            buttons[3].scale.set(0.8);
            buttons[4].scale.set(0.8, 1.2);
            buttons[4].rotation = Math.PI;

            function onButtonDown(button, textureButtonDown) {
                button.isdown = true;
                button.texture = textureButtonDown;
                button.alpha = 1;
            }

            function onButtonUp(button, textureButton, textureButtonOver) {
                button.isdown = false;
                button.texture = button.isOver ? textureButtonOver : textureButton;
            }

            function onButtonOver(button, textureButtonOver) {
                button.isOver = true;
                if (!button.isdown) {
                    button.texture = textureButtonOver;
                }
            }

            function onButtonOut(button, textureButton) {
                button.isOver = false;
                if (!button.isdown) {
                    button.texture = textureButton;
                }
            }

            // Cleanup function to destroy PixiJS application when component unmounts
            return () => {
                app.destroy(true, true);
            };
        };

        const cleanup = initPixiApp();

        // Ensure cleanup is called on unmount
        return () => {
            if (cleanup instanceof Function) cleanup();
        };
    }, []);

    return <div ref={gameRef} id="game"></div>;
};

export default LifeQuestGame;
