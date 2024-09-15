import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

function ApplicationsModule() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/application/new');
    };

    return (
        <Button
            onClick={handleClick}
            type='primary'
            style={{ marginBottom: '0.5rem' }}
        >
            {'New Application'}
        </Button>
    );
}

export default ApplicationsModule;