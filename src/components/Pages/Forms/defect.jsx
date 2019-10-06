import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'

const cardWidth='80%'
const styles = makeStyles(theme=>({
    root:{
        flexGrow: 1,
        
    },
    card: {
        maxWidth: cardWidth,
        position:'absolute',
        height:'auto',
        backgroundColor:'#424242'
    },
    roots: {
        padding: theme.spacing(1, 2),
             },
      link: {
        display: 'flex',
        padding: theme.spacing(5),
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
      header:{
          padding:25
      },
      button: {
        marginLeft: 20,
      },
      formControl: {
        margin: theme.spacing(1),
      },
}))
const Level = [
    'Low',
    'Medium',
    'High',
    
  ];
  const projectIDS = [
    '1',
    '2',
    '5',
    
  ];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default class project extends Component {
    constructor(){
        super();
        this.state={
            defect:'',
            severity:'',
            priority:'',
            projectID:'',
            defectDescription:''

        }
    }
    componentDidMount(){
        const url= `http://127.0.0.1:8081/defect/api/v1/project`
        axios.get(url)
        .then(response=>{
            
        })
    }
     handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
      }
      handleSubmit=event=>{
        event.preventDefault()
        const data={defect:this.state.defect,defectdesc:this.state.defectDescription,project:{id:this.state.projectID},priority:this.state.priority,severity:this.state.severity}
        const url =`http://127.0.0.1:8081/defect/api/v1/defect`
        axios.post(url,data)
        .then(response=>{
            console.log(response)
        })
      }
    render() {
        const classes=styles
        return (
            <div className={classes.root}>
                <Grid 
                    container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <Paper elevation={1} className={classes.roots}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" href="/dashbord"  className={classes.link}>
                                <HomeIcon className={classes.icon} />
                                    Home
                                </Link>
                                <Typography color="textPrimary" className={classes.link}>
                                <WhatshotIcon className={classes.icon} />
                                Defect
                                </Typography>
                            </Breadcrumbs>
                            </Paper>
                            <Divider />
                            <form onSubmit={this.handleSubmit}>
                             <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className="project-header"
                             >   
                            <Grid item xs={12}>
                                <Paper>
                                <Typography color="textPrimary" className={classes.header}>
                                    Add Defect
                                </Typography>
                                </Paper>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Defect Name"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter Defectname"
                                fullWidth
                                margin="normal"
                                name="defect"
                                onChange={this.handleChange}
                                value={this.state.defect}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Defect Description"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter Defect Description"
                                fullWidth
                                name="defectDescription"
                                onChange={this.handleChange}
                                value={this.state.defectDescription}
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </Grid>
                                <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Priority</InputLabel>
                                <Select
                                name='priority'
                                value={this.state.priority}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                               
                                >
                                {Level.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel} >
                                    {lavel}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl> 
                                </Grid>
                                <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Severity</InputLabel>
                                <Select
                                name='severity'
                                value={this.state.severity}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                              
                                >
                                {Level.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel} >
                                    {lavel}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>     
                            </Grid>
                            <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Project ID</InputLabel>
                                <Select
                                name='projectID'
                                value={this.state.projectID}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                               
                                >
                                {projectIDS.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel} >
                                    {lavel}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl> 
                                </Grid>
                            <Grid item xs={12} >
                            <Button variant="outlined" color="primary" style={{marginBottom:'5%',marginTop:'2%',marginLeft:'50%',transform:'translate(-50%)',width:'25%'}} type="submit">
                                Save Defect
                            </Button>
                            </Grid>
                            </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
