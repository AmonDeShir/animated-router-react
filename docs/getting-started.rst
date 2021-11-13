Getting Started
===============
To use Animated Router, you will need a react project. 
Use ``Create React App`` to create one.

.. tabs::

		.. tab:: Yarn
  			$ yarn create react-app demo-app
    		$ cd ./demo-app

		.. tab:: Npx
    		$ npx create-react-app demo-app
    		$ cd ./demo-appo


Installation
------------
Download the package using your favorite package manager.

.. tabs::

		.. tab:: Yarn
    		
				$ yarn add animated-router-react

  	.. tab:: Npm
				
				$ npm install animated-router-react
      
Basic Routing
-------------

Add the ``Navigation`` tag to your App component.

.. code-block:: jsx

		import Navigation from 'animated-router-react';
 
		function App() {
		  return (
	 	    <Navigation>
 	 	    </Navigation>
  		);
		}

		export default App;

Next, add some Routes.

.. code-block:: jsx

		import Navigation, { Route } from 'animated-router-react';
 			
		function App() {
		  return (
	 	   	<Navigation>
	 	   		<Route
        		path="/"
        		component={<>Main</>}
     			/>
     					
     			<Route
        		path="/page1"
        		component={<>Page 1</>}
     			/>
     					
     			<Route
      			path="/page2"
      			component={<>Page 2</>}
   				/>
 	  		</Navigation>
			);
		}

		export default App;

The ``Route`` component has two required properties.
1. ``path`` is a  property that defines your component address. For example, when you write in your address bar ``localhost:3000/page1`` route with path ``page-1`` will be displayed. The path should be a valid URL path. There are also two special paths reserved': ``/`` and ``/404``.
		
* ``/`` means index route. This route will be displayed when you enter your page ``localhost:3000/`` without a specific path.
* ``/404`` means page not found. This route is displayed if you try to open a page with a path that isn't defined in the Navigation component. For example ``localhost:3000/page3``.
		
2. ``component`` This property defines which page will be displayed. It can be any JSX component, but if you want to animate your page during the transition, it must be a React.forwardRef component.

Links
-----
Ok, let's add some links to your application.

.. code-block:: jsx

		import Navigation, { Route, Link } from 'animated-router-react';
 			
 		function App() {
		  return (
	 	   	<Navigation>
	 	   		<Route
        		path="/"
        		component={(
        			<>
        				Main
        				<Link to="/page1">Go to page 1</Link>
        				<Link to="/page2">Go to page 2</Link>
        			</>
        		)}
     			/>
     					
     			<Route
        		path="/page1"
        		component={(
        			<>
        			  Page 1
        			  <Link to="/1">Go to main page</Link>
        				<Link to="/page2">Go to page 2</Link>
        			</>
        		)}
     			/>
     					
     			<Route
        		path="/page2"
        		component={(
        			<>
        				Page 2
        				<Link to="/">Go to main page</Link>
        				<Link to="/page1">Go to page 1</Link>
        			</>
        		)}
     			/>
 	 	  	</Navigation>
  		);
		}

		export default App;
				
``Link`` it's a simple link component.
It has one required prop ``to``, Thats define where you will be redirected if you click a link.

Link also has two optional props ``className`` and ``style`` thats allow you to style your link. From css side Link is just an ``<a>`` tag.


Navigation bar add footer
-------------------------
Links in our pages are very simlar. So move it outside to simplyfy our code.

.. code-block:: jsx

 		import Navigation, { Route, Link } from 'animated-router-react';
 			
 		function App() {
		  return (
	 	   	<Navigation>
	 	   		<nav>
	 	   		  <Link to="/">Go to main page</Link>
        		<Link to="/page1">Go to page 1</Link>
	 	   		  <Link to="/page2">Go to page 2</Link>
	 	   		</nav>
	 	   		
	 	   		<Route
        		path="/"
        		component={<>Main</>}
     			/>
     					
     			<Route
        		path="/page1"
        		component={(<>Page 1</>}
     			/>
     					
     			<Route
        		path="/page2"
        		component={<>Page 2</>}
     			/>
 	 	  	</Navigation>
  		);
		}

		export default App;
				

All JSX components thats aren't <Route /> will be ignored and in result display normaly. 

Ok, now let's add footer in the same way.

.. code-block:: jsx
 			
    import Navigation, { Route, Link } from 'animated-router-react';
 			
 		function App() {
		  return (
	 	  	<Navigation>
	 	   		<nav>
	 	   			<Link to="/">Go to main page</Link>
        		<Link to="/page1">Go to page 1</Link>
	 	   		  <Link to="/page2">Go to page 2</Link>
	 	   		</nav>
	 	   		
	 	   		<Route
        		path="/"
        		component={<>Main</>}
     			/>
     					
     			<Route
        		path="/page1"
        		component={(<>Page 1</>}
     			/>
     					
     			<Route
        		path="/page2"
        		component={<>Page 2</>}
     			/>
     					
     			<footer>© Someone 2077</footer>
 	 	  	</Navigation>
  		);
		}

		export default App;

Styling
-------



