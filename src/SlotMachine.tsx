import React, {useEffect, useRef, useState} from 'react';
import {
    Application,
    Assets,
    Color,
    Container,
    Texture,
    Sprite,
    Graphics,
    Text,
    TextStyle,
    BlurFilter,
    FillGradient,
} from 'pixi.js';

interface SlotMachineProps {
    reelCount?: number;
    rowCount?: number;
}

export function SlotMachine(props: SlotMachineProps) {
    const reelCount = props.reelCount ?? 5;
    const rowCount = props.rowCount ?? 3;

    const containerRef = useRef<HTMLDivElement>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        const initPixi = async () => {
            if (!containerRef.current) return;

            const application = new Application({
                backgroundColor: 0x1099bb,
                width: 800,
                height: 600
            });

            await application.init({
                autoStart: false, width: 1366, height: 766,
                // resizeTo: window, //moze i so ova, ama za celite na prezentacija go iskomentirav, no so custom
                //configs super bi doshlo
                sharedTicker: true, backgroundColor: "#ced21b"
            });
            containerRef.current.appendChild(application.canvas);

            // Load the textures
            await Assets.load([
                process.env.PUBLIC_URL + '/Assets/9.webp',
                process.env.PUBLIC_URL + '/Assets/10.png',
                process.env.PUBLIC_URL + '/Assets/11.webp',
                process.env.PUBLIC_URL + '/Assets/12.webp',
            ]);

            const REEL_WIDTH: number = 180;
            const SYMBOL_SIZE: number = 170;

            // Create different slot symbols / staviv moi sliki kolku za demonstracija i reiskoristlivost na igrata
            const slotTextures = [
                Texture.from(process.env.PUBLIC_URL + '/Assets/9.webp'),
                Texture.from(process.env.PUBLIC_URL + '/Assets/10.png'),
                Texture.from(process.env.PUBLIC_URL + '/Assets/11.webp'),
                Texture.from(process.env.PUBLIC_URL + '/Assets/12.webp'),
            ];

            // Build the reels
            const reels: any = [];
            const reelContainer = new Container();

            for (let i = 0; i < reelCount; i++) {
                const rc = new Container();

                rc.x = i * REEL_WIDTH;
                reelContainer.addChild(rc);

                const reel: any = {
                    container: rc,
                    symbols: [],
                    position: 0,
                    previousPosition: 0,
                    blur: new BlurFilter(),
                };

                reel.blur.blurX = 0;
                reel.blur.blurY = 0;
                rc.filters = [reel.blur];

                // Build the symbols
                for (let j = 0; j < rowCount + 1; j++) {
                    const symbol: Sprite = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
                    // Scale the symbol to fit symbol area.

                    symbol.y = j * SYMBOL_SIZE;
                    symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                    symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                    reel.symbols.push(symbol);
                    rc.addChild(symbol);
                }
                reels.push(reel);
            }
            application.stage.addChild(reelContainer);

            // Build top & bottom covers and position reelContainer
            const margin = (application.screen.height - SYMBOL_SIZE * rowCount) / 2;

            reelContainer.y = margin;
            reelContainer.x = Math.round(application.screen.width - REEL_WIDTH * reelCount);
            const top = new Graphics().rect(0, 0, application.screen.width, margin).fill({ color: 0x0 });
            const bottom = new Graphics().rect(0, SYMBOL_SIZE * rowCount + margin, application.screen.width, margin).fill({ color: 0x0 });

            // Create gradient fill
            const fill = new FillGradient(0, 0, 0, 36 * 1.7);

            const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

            colors.forEach((number, index) => {
                const ratio = index / colors.length;

                fill.addColorStop(ratio, number);
            });

            // Add play text
            const gameTitleStyle: any = new TextStyle({
                fontFamily: 'Arial Black',
                fontSize: 36,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#f8f6f6', // Golden color
                stroke: { color: '#8B4513', width: 5 }, // Brown stroke
                dropShadow: {
                    color: 0x000000,
                    alpha: 0.5,
                    angle: Math.PI / 6,
                    blur: 8,
                    distance: 12,
                },
                wordWrap: true,
                wordWrapWidth: 440,
            });

            const spinButtonStyle: any = new TextStyle({
                fontFamily: 'Arial Black',
                fontSize: 36,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#FFD700', // Golden color
                stroke: { color: '#8B4513', width: 5 }, // Brown stroke
                // dropShadow: {
                //     color: 0x000000,
                //     alpha: 0.5,
                //     angle: Math.PI / 6,
                //     blur: 8,
                //     distance: 12,
                // },
                wordWrap: true,
                wordWrapWidth: 440,
                letterSpacing: 5, // Adds space between letters
            });

            const playText: Text = new Text('SPIN!', spinButtonStyle);

            // Add some extra effects/ ekstra efekti
            // Center the text/ centriranje tekst
            playText.anchor.set(0.5); // Set anchor to center
            playText.x = application.screen.width / 2; // Center horizontally
            playText.y = application.screen.height / 2; // Center vertically

            // Add a pulsing effect/ da pulsira kopceto
            // let pulseScale = 0.5;
            // application.ticker.add(() => {
            //     pulseScale += 0.01;
            //     playText.scale.set(pulseScale);
            //     if (pulseScale > 1) {
            //         pulseScale = 0.6;
            //     }
            // });

            // Add a rotation effect/ efekt za rotacija
            let rotation = 0;
            application.ticker.add(() => {
                rotation += 0.03;
                playText.rotation = Math.sin(rotation) * 0.07;
                headerText.rotation = Math.sin(rotation) * 0.03;
            });

            playText.x = Math.round((bottom.width - playText.width) / 2);
            playText.y = application.screen.height - margin + Math.round((margin - playText.height) / 2);
            bottom.addChild(playText);

            // Add header text
            const headerText = new Text('V MACHINE SLOTS!', gameTitleStyle);

            headerText.x = Math.round((top.width - headerText.width) / 2);
            headerText.y = Math.round((margin - headerText.height) / 2);
            top.addChild(headerText);

            application.stage.addChild(top);
            application.stage.addChild(bottom);

            // Set the interactivity.
            bottom.eventMode = 'static';
            bottom.cursor = 'pointer';
            bottom.addListener('pointerdown', () => {
                startPlay();
            });

            let running = false;

            // Function to start playing.
            function startPlay() {
                if (running) return;
                running = true;

                for (let i = 0; i < reels.length; i++) {
                    const r = reels[i];
                    const extra = Math.floor(Math.random() * rowCount);
                    const target = r.position + 10 + i * reelCount + extra;
                    const time = 2500 + i * 600 + extra * 600;

                    tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
                }
            }

            // Reels done handler.
            function reelsComplete() {
                running = false;
            }

            // Listen for animate update.
            application.ticker.add(() => {
                // Update the slots.
                for (let i = 0; i < reels.length; i++) {
                    const r = reels[i];
                    // Update blur filter y amount based on speed.
                    // This would be better if calculated with time in mind also. Now blur depends on frame rate.

                    r.blur.blurY = (r.position - r.previousPosition) * 8;
                    r.previousPosition = r.position;

                    // Update symbol positions on reel.
                    for (let j = 0; j < r.symbols.length; j++) {
                        const s = r.symbols[j];
                        const prevy = s.y;

                        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                        if (s.y < 0 && prevy > SYMBOL_SIZE) {
                            // Detect going over and swap a texture.
                            // This should in proper product be determined from some logical reel.
                            s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                            s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                            s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                        }
                    }
                }
            });

            // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
            const tweening: any = [];

            function tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any) {
                const tween = {
                    object,
                    property,
                    propertyBeginValue: object[property],
                    target,
                    easing,
                    time,
                    change: onchange,
                    complete: oncomplete,
                    start: Date.now(),
                };

                tweening.push(tween);

                return tween;
            }

            application.ticker.add(() => {
                const now = Date.now();
                const remove = [];

                for (let i = 0; i < tweening.length; i++) {
                    const t = tweening[i];
                    const phase = Math.min(1, (now - t.start) / t.time);

                    t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
                    if (t.change) t.change(t);
                    if (phase === 1) {
                        t.object[t.property] = t.target;
                        if (t.complete) t.complete(t);
                        remove.push(t);
                    }
                }
                for (let i = 0; i < remove.length; i++) {
                    tweening.splice(tweening.indexOf(remove[i]), 1);
                }
            });

            // Basic lerp funtion.
            function lerp(a1: any, a2: any, t: any) {
                return a1 * (1 - t) + a2 * t;
            }

            // Backout function from tweenjs.
            function backout(amount: any) {
                return (t: any) => --t * t * ((amount + 1) * t + amount) + 1;
            }

            console.log("Starting app");
            console.log("Ref: ", containerRef.current);
            application.start();
            setInitialized(true);
        };

        if (!initialized) {
            console.log("initializing app")
            initPixi();
        }

        return () => {
            // Clean up Pixi.js resources here if needed
        };
    }, [initialized]);

    return (
        <div>
            {/*<h1>Slot Machine Game</h1>*/}
            <div ref={containerRef}></div>
        </div>
    );
}