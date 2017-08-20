import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

const duration = 100;
const styles = {
    root: {
        width: '100%',
        minWidth:'320px',
        flexGrow: 1
    },
    appbar:{
        minWidth:'320px',
        zIndex:'9999'
    },
    flex: {
        flex: 1,
    },
    sidebar:{
        width:'250px',
        marginTop:'60px',
        padding:'50px',
        boxSizing: 'border-box',
    },
    container:{
        transition: `all ${duration}ms ease-in-out`,
        width:'100%',
        height:'100%',
        marginTop:'90px',
    },
    paper: {
        width: '100%',
        height: '100%',
        boxShadow:'none',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding:'50px',
        boxSizing: 'border-box'
    },
};


class Main extends React.Component {
    constructor(props){
        super(props)
        this.classes = props.classes;
        this.state={
            drawer:{
                left:true,
                docked:true
            }
        }
    }
    componentDidMount(){
        window.addEventListener('resize', this.resizeListener);
        this.resizeListener();
    }
    resizeListener=()=> {        
        const center = this.centerRef;
        const paper = this.paperRef;
        let bodyWidth = document.body.offsetWidth;
        let bodyHeight = document.documentElement.clientHeight;
        paper.style.height = String(`${bodyHeight-120}px`)
        this.setState({
            inProp:!this.state.inProp
        })
        if(bodyWidth > 1024){            
            center.style.marginLeft=String(`250px`);
            center.style.width = String(`${bodyWidth-250}px`);
            this.setState({
                drawer:Object.assign({},this.state.drawer, {
                    left:true,
                    docked:true
                })
            })
        }
        else{
            center.style.marginLeft=String(`0`);
            center.style.width = '100%';
            this.setState({
                drawer:Object.assign({},this.state.drawer, {
                    left:false,
                    docked:false
                })
            })
        }
    }
    onShowDrawer=()=>{
        const node = this.centerRef;
        let bodyWidth = document.body.offsetWidth;
        let docked = bodyWidth>1024;
        this.setState({
            drawer:Object.assign({},this.state.drawer, {
                left:!this.state.drawer.left,
                docked:docked
            })
        },()=>{
            if(this.state.drawer.left && bodyWidth > 1024){
                node.style.marginLeft=String(`250px`);
                node.style.width = String(`${bodyWidth-250}px`);
            }
            else{
                node.style.marginLeft=String(`0`);
                node.style.width = '100%';
            }
        })     
    }
    handleLeftClose=()=>{
        this.setState({
        drawer:Object.assign({},this.state.drawer, {
            left:false
        })
        }) 
    }
    onGoto=()=>{
        window.location.href="https://github.com/zhangwei900808/react-material-layout"
    }
  render(){
    return (
        <div className={this.classes.root}>
            <AppBar position="fixed" className={this.classes.appbar}>
                <Toolbar>
                <IconButton color="contrast" aria-label="Menu" onClick={this.onShowDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={this.classes.flex}>
                    React-Material-Layout
                </Typography>
                <Button color="contrast" onClick={this.onGoto}>Github</Button>
                </Toolbar>
            </AppBar>
            <section className={this.classes.root}>
            <div>
                <Drawer
                    className={'sidebar'}
                    anchor="left"
                    docked={this.state.drawer.docked}
                    enterTransitionDuration={duration}
                    leaveTransitionDuration={duration}
                    open={this.state.drawer.left}
                    onClick={this.handleLeftClose}>
                    <div className={this.classes.sidebar}>
                        Sidebar
                    </div>
                </Drawer>
            </div>
            <div ref={ref => (this.centerRef = ref)} 
                className={this.classes.container}>
                <Grid container spacing={0} justify={'center'}>
                    <Grid item xs={11}>
                        <div ref={ref => (this.paperRef = ref)}>
                            <Paper className={this.classes.paper}>
                                Center
                            </Paper>
                        </div>                        
                    </Grid>
                </Grid>
            </div>
          </section>
        </div>
      );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);