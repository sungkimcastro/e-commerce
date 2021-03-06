import React from "react";
import { connect } from "react-redux";
import selectProducts from "../selectors/products";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import ListProducts from "./ListProducts";
import { setPage } from "../store/actions/filters";

const Products = ({
	products,
	filters,
	currentPage,
	productsPerPage,
	setCurrentPage,
}) => {
	const lastProducts = currentPage * productsPerPage;
	const firstProducts = lastProducts - productsPerPage;
	const currentProducts = products.slice(firstProducts, lastProducts);

	const onPaginate = (pageNumber) => setCurrentPage(pageNumber);

	const RenderText = () => {
		if (!products.length) return <h1>No Products with that value</h1>;
		else return <h1>All Products</h1>;
	};

	return (
		<div>
			<SideBar />
			<div className="content-page" id="content-page">
				<NavBar />
				{filters.filter.department || filters.filter.color ? (
					<div>
						<h2>{filters.filter.department}</h2>
						<h2>{filters.filter.color}</h2>
					</div>
				) : (
					RenderText()
				)}
				<div className="row">
					{currentProducts.map((product) => (
						<ListProducts product={product} key={product.id} />
					))}
				</div>
				<Pagination
					productsPerPage={productsPerPage}
					totalProducts={products.length}
					onPaginate={onPaginate}
				/>
			</div>
		</div>
	);
};

const mapToProps = (state) => {
	return {
		products: selectProducts(state.products[0], state.filters),
		filters: state.filters,
		currentPage: state.filters.currentPage,
		productsPerPage: state.filters.productsPerPage,
	};
};

const mapDispatchProps = (dispatch) => {
	return {
		setCurrentPage: (page) => dispatch(setPage(page)),
	};
};

export default connect(mapToProps, mapDispatchProps)(Products);
