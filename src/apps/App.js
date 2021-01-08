/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { Rnd as Draggable } from 'react-rnd';
import styled from 'styled-components';
import TitleBar from 'components/molecules/TitleBar';
import { connect } from 'react-redux';
import { openApp, minimizeApp, maximizeApp, updateSize, updatePosition } from 'actions';
import zIndex from 'apps/zIndex.json';

const Content = styled.div`
    width: 100%;
    height: calc(100% - 40px);
    position: relative;
    bottom: 0;
    overflow: auto;
`;

const Application = styled(Draggable)`
    background: ${props => props.theme.secondary};
    border: 1px solid ${props => props.primary};
    border-radius: 16px;
    z-index: ${props => props.zindex};
`;

// eslint-disable-next-line no-shadow
const App = ({ children, isOpen, isMinimized, isMaximized, x, y, width, height, minWidth, minHeight, appName, openApp, minimizeApp, maximizeApp, updateSize, updatePosition, themeState }) => {
    const { primary } = themeState;
    console.log(primary);
    const appSize = () => {
        let size = null;
        if (isMaximized) {
            size = { width: '100%', height: '100%' };
        } else if (isMinimized) {
            size = { width: 0, height: 0 }
        } else {
            size = { width, height }
        }
        return size;
    }
    let [ index, setIndex ] = useState(zIndex.zIndex += 1);
    if(isOpen){
        return(
            <Application
                primary={primary}
                zindex={zIndex.zIndex}
                size={appSize()}
                minWidth={minWidth || '480'}
                minHeight={minHeight || '360'}
                onDragStart={() => setIndex(index += 1)}
                onResizeStart={() => setIndex(index += 1)}
                position={!isMaximized ? { x, y } : { x: 0, y: 0 }}
                onDragStop={(e, d) => updatePosition(appName, e, d)}
                onResizeStop={(e, direction, ref, delta, position) => updateSize(appName, e, direction, ref, delta, position)}
                dragHandleClassName='dragHandler'
                enableResizing={!isMaximized}
                disableDragging={isMaximized}
            >
                <TitleBar appName={appName} exit={openApp} minimize={minimizeApp} maximize={maximizeApp} isMaximized={isMaximized}/>
                <Content>
                    {children}
                </Content>
            </Application>
        );
    }
    return null;
}

const mapDispatchToProps = dispatch => ({
    openApp: (app) => dispatch(openApp(app)),
    minimizeApp: (app) => dispatch(minimizeApp(app)),
    maximizeApp: (app) => dispatch(maximizeApp(app)),
    updateSize: (app, e, direction, ref, delta, position) => dispatch(updateSize(app, e, direction, ref, delta, position)),
    updatePosition: (app, e, d) => dispatch(updatePosition(app, e, d))
});

const mapStateToProps = (state) => {
    return {
        themeState: state.themeReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);