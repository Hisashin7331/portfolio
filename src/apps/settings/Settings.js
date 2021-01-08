import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import App from 'apps/App';
import { TwitterPicker } from 'react-color';
import Switch from 'components/atoms/Switch';
// import desktop from 'assets/img/preferences/preferences-desktop.svg';
import app from 'assets/img/preferences/preferences-app.svg';
import colors from 'assets/img/preferences/preferences-colors.svg';
import taskbar from 'assets/img/preferences/preferences-taskbar.svg';
// import language from 'assets/img/preferences/preferences-language.svg';
import time from 'assets/img/preferences/preferences-time.svg';
import notifications from 'assets/img/preferences/preferences-notifications.svg';
import cookies from 'assets/img/preferences/preferences-cookies.svg';
import info from 'assets/img/preferences/preferences-info.svg';
import lightmode from 'assets/img/preferences/color/lightmode.svg';
import darkmode from 'assets/img/preferences/color/darkmode.svg';
import basic from 'assets/img/preferences/taskbar/basic.svg';
import rounded from 'assets/img/preferences/taskbar/rounded.svg';
import { switchStyle, switchMode, updateTaskbarTransparency, changePrimary, switchIconType, switchDateHide, switchDateFormat } from 'actions';

const Content = styled.div`
    padding-top: 32px;
    min-height: calc(100% - 32px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: ${props => props.theme.text};
`;

const Side = styled.div`
    width: 40%;
    max-width: 800px;
    ${props => props.right && css`
        margin-left: 16px;
    `}
    ${props => props.left && css`
        margin-right: 16px;
    `}
`;

const Section = styled.div`
    border-radius: 15px;
    background: ${props => props.theme.primary};
    padding: 16px; 
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 32px;
    span {
        width: 50%;
        display: flex;
        align-items: center;
        img {
            margin-right: 3%;
            height: 48px;
        }
        h1 {
            font-size: 32px;
        }
        margin-bottom: 16px;
    }
    font-weight: 300;
`;

const Subsection = styled.div`  
    border-radius: 15px;
    background: ${props => props.theme.secondary};
    width: calc(100% - 32px);
    padding: 16px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    ${props => props.vertical && css`
        flex-direction: column;
    `}
    &:last-child {
        margin-bottom: 0;
    }
`;

const Picker = styled(TwitterPicker)`
    span {
        display: block;
        margin: 0;
        width: auto;
    }
`;

const Mode = styled.span` 
    width: calc(45% - 16px);
    padding: 8px;
    ${props => props.left && css`
        border-radius: 15px 0 0 15px;
    `}
    ${props => props.right && css`
        border-radius: 0 15px 15px 0;
    `}
    background: ${props => props.theme.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        border: none;
        background: transparent;
        width: 100%;
        border-radius: 15px;
        margin-bottom: 8px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        position: relative;
        img {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            border-radius: 12px;
        }
    }
    ${props => props.isActive && css`
        div {
            position: absolute;
            left: -1px;
            top: -1px;
            border-radius: 12px;
            width: calc(100% - 8px);
            height: calc(100% - 8px);
            border: 5px solid ${props.color};
        }
    `}
`;


// eslint-disable-next-line no-shadow
const Settings = ({ settings, switchMode, switchStyle, updateTaskbarTransparency, changePrimary, theme }) => {
    const { style, mode, primary } = theme;
    const { isOpen, isMinimized, isMaximized, x, y, width, height, appName } = settings;
    const [ rangeValue, updateRangeValue ] = useState(30);
    const [ color, updateColor ] = useState('#FFFFFF');
    const pickerColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#EB144C', '#F78DA7', '#9900EF', color];
    return(
        <App isOpen={isOpen} isMinimized={isMinimized} isMaximized={isMaximized} x={x} y={y} width={width} height={height} appName={appName} minWidth='1008' minHeight='567'>
            <Content>
                <Side left>
                    <Section>
                        <span><img src={taskbar} alt='taskbar' /><h1>Taskbar</h1></span>
                        <Subsection>
                            Transparency:
                            <input style={{ width: '35%' }} type='range' min='0' max='100' value={rangeValue} onChange={(e) => {
                                updateRangeValue(e.target.value);
                                updateTaskbarTransparency(e.target.value);
                            }}/>
                        </Subsection>
                        <Subsection>
                            Icon type:
                            <Switch left='icon' right='text' dispatch={switchIconType} color={primary}/>
                        </Subsection>
                    </Section>
                    <Section>
                        <span><img src={app} alt='app' /><h1>App</h1></span>
                        <Subsection>
                            <Mode isActive={style === 'basic'} left color={primary}>
                                <button type='button' onClick={() => switchStyle('basic')}>
                                    <img src={basic} alt='' />
                                    <div />
                                </button>
                                basic
                            </Mode>
                            <Mode isActive={style === 'rounded'} right color={primary}>
                                <button type='button' onClick={() => switchStyle('rounded')}>
                                    <img src={rounded} alt='' />
                                    <div />
                                </button>
                                rounded
                            </Mode>
                        </Subsection>
                    </Section>
                    <Section>
                        <span><img src={notifications} alt='notifications' /><h1>Notifications</h1></span>
                        <Subsection>
                            Feature not added yet!
                        </Subsection>
                    </Section>
                    <Section>
                        <span><img src={cookies} alt='cookies' /><h1>cookies</h1></span>
                        <Subsection>
                            Feature not added yet!
                        </Subsection>
                    </Section>
                 </Side>
                 <Side right>
                    <Section>
                        <span><img src={colors} alt='colors' /><h1>Colors</h1></span>
                        <Subsection>
                            <Mode isActive={mode === 'light'} left color={primary}>
                                <button type='button' onClick={() => switchMode('light')}>
                                    <img src={lightmode} alt='' />
                                    <div />
                                </button>
                                light
                            </Mode>
                            <Mode isActive={mode === 'dark'} right color={primary}>
                                <button type='button' onClick={() => switchMode('dark')}>
                                    <img src={darkmode} alt='' />
                                    <div />
                                </button>
                                dark
                            </Mode>
                        </Subsection>
                        <Subsection>
                            <span style={{alignSelf: 'flex-start', width: 'auto'}}>Primary Color:</span>
                            <Picker disableAlpha triangle='hide' color={color} onChange={(e) => {
                                updateColor(e.hex);
                                changePrimary(e.hex);
                            }} colors={pickerColors} />
                        </Subsection>        
                    </Section>
                    <Section>
                        <span><img src={time} alt='date&time' /><h1>Date & Time</h1></span>
                        <Subsection>
                            Format:
                            <Switch left='24h' right='12h' dispatch={switchDateFormat} color={primary}/>
                        </Subsection>
                        <Subsection>
                            Date:
                            <Switch left='hide' right='show' dispatch={switchDateHide} color={primary}/>
                        </Subsection>
                    </Section>
                    <Section>
                        <span><img src={info} alt='info' /><h1>Info</h1></span>
                        <Subsection>
                            HisaSystems
                        </Subsection>
                    </Section>
                </Side>
            </Content>
        </App>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.appsReducer.settings,
        theme: state.themeReducer
    }
}

const mapDispatchToProps = dispatch => ({
    switchMode: (mode) => dispatch(switchMode(mode)),
    switchStyle: (style) => dispatch(switchStyle(style)),
    updateTaskbarTransparency: (transparency) => dispatch(updateTaskbarTransparency(transparency)),
    changePrimary: (color) => dispatch(changePrimary(color)),
    switchIconType: (type) => dispatch(switchIconType(type)),
    switchDateHide: (hide) => dispatch(switchDateHide(hide)),
    switchDateFormat: (format) => dispatch(switchDateFormat(format))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);