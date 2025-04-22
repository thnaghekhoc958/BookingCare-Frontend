import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Chip,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
  },
  card: {
    transition: 'transform 0.3s ease-in-out',
    borderRadius: 15,
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
    },
  },
  gradientCard1: {
    background: 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
    color: 'white',
  },
  gradientCard2: {
    background: 'linear-gradient(45deg, #4ECDC4 30%, #556270 90%)',
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  content: {
    padding: theme.spacing(3),
  },
  infoBox: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  featureBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  icon: {
    fontSize: '2rem',
    marginRight: theme.spacing(2),
    color: '#FF6B6B',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  mainTitle: {
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    fontSize: '2.5rem',
  },
  subtitle: {
    color: '#7F8C8D',
    marginBottom: theme.spacing(4),
  },
  symptomInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    padding: '10px 30px',
    '&:hover': {
      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
    }
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  resultCard: {
    marginTop: theme.spacing(3),
    background: 'linear-gradient(45deg, #43A047 30%, #66BB6A 90%)',
    color: 'white',
  },
  symptomCard: {
    marginTop: theme.spacing(3),
    background: 'white',
    padding: theme.spacing(2),
  }
}));

const SmartMedicalExamination = () => {
  const classes = useStyles();
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Vui lòng nhập triệu chứng của bạn');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/predict-symptom', {
        symptoms: symptoms
      });
      
      console.log(response.data.data.label);
      
      
      // Sử dụng dữ liệu mẫu thay vì response.data
      setResult(response.data.data.label);
    } catch (error) {
      console.error('Error:', error);
      setError('Không thể kết nối đến server');
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <Box className={classes.infoBox}>
          <Typography variant="body1" style={{ textAlign: 'center', color: '#2C3E50' }}>
            Đang phân tích triệu chứng...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box className={classes.infoBox} style={{ backgroundColor: '#FFEBEE' }}>
          <Typography variant="body1" style={{ color: '#D32F2F', textAlign: 'center' }}>
            {error}
          </Typography>
        </Box>
      );
    }

    if (result) {
      console.log(result);
      return (
        <>
          <Box className={classes.infoBox}>
            <Typography variant="h6" style={{ color: '#2C3E50', marginBottom: 16 }}>
              Chẩn Đoán Sơ Bộ
            </Typography>
            {result.confidence && (
              <Typography variant="body1" style={{ color: '#34495E', marginBottom: 8 }}>
                Độ tin cậy: {result.confidence}%
              </Typography>
            )}
            {result.diseases && result.diseases.length > 0 ? (
              result.diseases.map((disease, index) => (
                <Box key={index} style={{ marginBottom: 12 }}>
                  <Typography variant="subtitle1" style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                    {disease.name}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#34495E' }}>
                    Khả năng mắc bệnh: {disease.probability}%
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" style={{ color: '#34495E' }}>
                Không tìm thấy bệnh phù hợp với các triệu chứng đã mô tả
              </Typography>
            )}
          </Box>



          <Box className={classes.infoBox}>
            <Typography variant="h6" style={{ color: '#2C3E50', marginBottom: 16 }}>
              Lưu Ý Quan Trọng
            </Typography>
            <Typography variant="body2" style={{ color: '#D32F2F' }}>
              * Kết quả này chỉ mang tính chất tham khảo. Vui lòng đến cơ sở y tế gần nhất để được khám và chẩn đoán chính xác.
            </Typography>
          </Box>
        </>
      );
    }

    return (
      <Box className={classes.infoBox}>
        <Typography variant="body1" style={{ color: '#34495E', textAlign: 'center' }}>
          Vui lòng mô tả triệu chứng và nhấn "Phân Tích Triệu Chứng" để xem kết quả
        </Typography>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <Container>
        <Box className={classes.headerSection}>
          <Typography variant="h3" className={classes.mainTitle}>
            Khám Bệnh Thông Minh
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Giải pháp chăm sóc sức khỏe hiện đại và tiện lợi
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className={`${classes.card} ${classes.gradientCard1}`}>
              <CardContent className={classes.content}>
                <Typography variant="h5" className={classes.title}>
                  Mô Tả Triệu Chứng
                </Typography>
                
                <TextField
                  className={classes.symptomInput}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Hãy mô tả chi tiết các triệu chứng bạn đang gặp phải..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  error={!!error}
                  helperText={error}
                  fullWidth
                />
                
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={handleSubmit}
                  type="button"
                  fullWidth
                  disableElevation
                >
                  Phân Tích Triệu Chứng
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={`${classes.card} ${classes.gradientCard2}`}>
              <CardContent className={classes.content}>
                <Typography variant="h5" className={classes.title}>
                  Kết Quả Phân Tích
                </Typography>
                {renderResult()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmartMedicalExamination));
