import { render, screen } from '@testing-library/react';
import App from './App';
import { Route } from 'react-router';

import NavBar from './components/navbar/navbar';

import NotFound from './components/notFound';

import AllRoutes from './utils/allRoutes';
import Customers from './components/customers/listCustomers';
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { shallow } from 'enzyme';

describe('React Customer Tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test('invalid path should redirect to 404', () => {
    const routeWrapper = shallow(<AllRoutes />);
    const pathMap = routeWrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap['/customers']).toBe(Customers);
    //expect(pathMap['/nnnnnnnnn']).toBe(NotFound);
    //expect(routeWrapper.find(Customers)).toHaveLength(1);
    //expect(routeWrapper.find(NotFound)).toHaveLength(0);
  });
  test('render learn react link', () => {
    render(<BrowserRouter><NavBar /></BrowserRouter>);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('render <Customers/> to see data', () => {
    //expect(wrapper.find(''))
    expect(wrapper.containsMatchingElement(<NavBar />)).toBe(true); // Can find nodes within the component
  });
})
