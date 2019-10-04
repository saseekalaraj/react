import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Route from '../Route/route'

const drawerWidth = 240;

const cardWidth = '95%';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: `5px 0 5px -5px #333`
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) +1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    height:100,

    backgroundColor:'#016c70'
  },
  content: {
    position:'absolute',
    flexGrow: 1,
    padding: theme.spacing(5),
    marginTop:40,
    backgroundColor:'#f2f2f2',
    marginLeft:`calc(100% - ${cardWidth})`,
    height:'100%',
    width:'100%',
  },
  size:{
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 5,
    width:'90%'
  },
 sizeShift: {
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: '11%',
  width:'80%'
  },
}));

export default function Sidebar () {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    const handleDrawerClose = () => {
        setOpen(false);
      };
      function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }
      const siteBarcontent =[{name:'Project',url:'/project'},{name:'Defect',url:'/defect'},{name:'Module',url:'/module'},{name:'Employee',url:'/employee'}]
        return (
            <div >
                 <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
         
        </div>
        <Divider />
        <List>
          {siteBarcontent.map((text, index) => (
            <ListItem   button key={index} onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose} >
              <ListItemLink href={text.url}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text.name} />
              </ListItemLink>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content} >
            <div className={clsx(classes.size, {
          [classes.sizeShift]: open,
        })}>
            <Route />
        </div>
      </main>
            </div>
        )
}
