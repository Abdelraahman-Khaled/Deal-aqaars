import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContainerMedia from '../../../Components/ContainerMedia/ContainerMedia';
import HelmetInfo from '../../../Components/Helmetinfo/HelmetInfo';
import factoryApi from '../../../api/factoryApi';

const AdminFactoryDashboard = () => {
    const [factories, setFactories] = useState([]);
    const [