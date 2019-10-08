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
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';

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
      
}))
  var columns= [
    { title: 'Project Name', field: 'projectname' },
    { title: 'Project Description', field: 'projectdesc' },
  ]
export default class project extends Component {
    constructor(){
        super();
        this.state={
            projectName:'',
            projectDescription:'',
            open:false,
            colums:[],
            data:[]
        }
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const url=`http://localhost:8081/defect/api/v1/project`
        axios.post(url,{projectname:this.state.projectName,projectdesc:this.state.projectDescription})
        .then(response=>{
            if(response.status===200){
            this.handleClick()
            this.componentDidMount()
            }
        })
        .catch(response=>{
            console.log(response)
        })
    }
    handleClick = () => {
        this.setState({ open: true});
      };
       handleClose = () => {
       this.setState({ open: false });
      };
    componentDidMount(){
        const url=`http://localhost:8081/defect/api/v1/project`
        axios.get(url)
        .then(response=>{
            this.setState({
                colums:columns,
                data:response.data
            })
        })
       
    }
    projectUpdate=(id,data)=>{
        const url=`http://localhost:8081/defect/api/v1/project/${id}`
        axios.put(url,data)
        .then(response=>{
                if(response.status===200){
                    this.handleClick()
                }
        })
    }
    projectDelete=(id)=>{
        const url=`http://localhost:8081/defect/api/v1/project/${id}`
        axios.delete(url)
        .then(response=>{
            if(response.status===200){
                this.handleClick()
               }
        })
    }
    
    render() {
   
        const classes=styles
        const vertical= 'top'
        const horizontal= 'center'
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
                                Project
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
                                    Add Project
                                </Typography>
                                </Paper>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Project Name"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter projectname"
                                fullWidth
                                name='projectName'
                                onChange={this.handleChange}
                                value={this.state.projectName}
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Project Description"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter description"
                                fullWidth
                                name='projectDescription'
                                onChange={this.handleChange}
                                margin="normal"
                                value={this.state.projectDescription}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </Grid>
                            <Grid item xs={12} >
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                style={{marginBottom:'5%',marginTop:'2%',marginLeft:'50%',transform:'translate(-50%)',width:'25%'}} 
                                type="submit"
                                
                            >
                                Save Project
                            </Button>
                            </Grid>
                            </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    key={`${vertical},${horizontal}`}
                    open={this.state.open}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Success</span>}
                />
                <Grid
                    container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                <Grid item xs={12}>
                <MaterialTable
                    title="Editable Example"
                    columns={columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.push(newData);
                            this.setState({ ...this.state, data });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data[data.indexOf(oldData)] = newData;
                            this.setState({ ...this.state.data, data });
                            this.projectUpdate(newData.id,newData)
                            }, 600);
                        }),
                        onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.splice(data.indexOf(oldData), 1);
                            this.setState({ ...this.state.data, data });
                            this.projectDelete(oldData.id)
                            }, 600);
                        }),
                    }}
                    />
                </Grid>
                </Grid>
            </div>
        )
    }
}
