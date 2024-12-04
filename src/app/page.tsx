import { Flex, Button, Avatar, SmartLink, Text, Grid, Icon, Carousel } from "@/once-ui/components";
import { Header } from "@/once-ui/modules";

const VetFlowLandingPage = () => {
	return (
		<div className="bg-gradient-to-t from-blue-50 to-blue-100 text-gray-800 min-h-screen">
			{/* Header Section */}
			<Header
				authenticated={false}
				avatar="https://randomuser.me/api/port"
			/>

			{/* Hero Section */}
			<section className="text-center mt-64 rounded-lg p-64">
			<Carousel slides={[
					{
						image: "/images/image1.jpg",
						children: (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ maxWidth: "400px" }}>
								<Text variant="heading-default-l" color="brand-medium">
									Welcome to VetFlow
								</Text>
								<Text variant="body-default-m" color="gray-600">
									The all-in-one solution for veterinary clinics
								</Text>
								<Button href="/signup" variant="primary" className="mt-8">
									Get Started
								</Button>
								<Button href="/features" variant="secondary" className="mt-4">
									Learn More
								</Button>
							</div>
						)
					},
					{
						image: "/image2.jpg",
						children: <div>Slide 2 content</div>
					}
				]} />
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 bg-gray-50 px-8">

				<Flex direction="row" alignItems="center" gap="16">
					<div className="flex p-s g-20 surface-background surface-border flex-column border-solid-1 radius-l shadow-l">
						<Icon name="Github" size="48" color="brand-medium" />
						<Text variant="heading-default-m" color="brand-medium">
							Appointment Scheduling
						</Text>
						<Text variant="body-default-s" color="gray-600">
							Streamline scheduling with our user-friendly calendar.
						</Text>
					</div>
					<div className="flex p-s g-20 surface-background surface-border flex-column border-solid-1 radius-l shadow-l">
						<Icon name="calendar" size="48" color="brand-medium" />
						<Text variant="heading-default-m" color="brand-medium">
							Appointment Scheduling
						</Text>
						<Text variant="body-default-s" color="gray-600">
							Streamline scheduling with our user-friendly calendar.
						</Text>
					</div>
					</Flex>
					
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 bg-blue-50 px-8">
				<Text variant="heading-default-l" align="center" className="mb-12">
					Pricing Plans
				</Text>
				<Grid columns="3" gap="16">
					<div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
						<Text variant="heading-default-m" color="brand-medium">
							Basic
						</Text>
						<Text variant="body-default-s" color="gray-600" className="my-4">
							$29/month
						</Text>
						<ul className="list-disc pl-4">
							<li>1 Clinic</li>
							<li>Basic Reports</li>
							<li>Email Support</li>
						</ul>
						<Button href="/signup?plan=basic" variant="secondary" className="mt-4">
							Choose Plan
						</Button>
					</div>
					<div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
						<Text variant="heading-default-m" color="brand-medium">
							Pro
						</Text>
						<Text variant="body-default-s" color="gray-600" className="my-4">
							$59/month
						</Text>
						<ul className="list-disc pl-4">
							<li>Up to 5 Clinics</li>
							<li>Advanced Reports</li>
							<li>Priority Support</li>
						</ul>
						<Button href="/signup?plan=pro" variant="secondary" className="mt-4">
							Choose Plan
						</Button>
					</div>
					<div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
						<Text variant="heading-default-m" color="brand-medium">
							Enterprise
						</Text>
						<Text variant="body-default-s" color="gray-600" className="my-4">
							Contact Us
						</Text>
						<ul className="list-disc pl-4">
							<li>Unlimited Clinics</li>
							<li>Custom Reports</li>
							<li>Dedicated Support</li>
						</ul>
						<Button href="/contact" variant="secondary" className="mt-4">
							Contact Us
						</Button>
					</div>
				</Grid>
			</section>

			{/* Footer Section */}
			<footer className="bg-blue-600 text-white py-6 px-8 text-center">
				<Text variant="body-default-s">
					&copy; {new Date().getFullYear()} VetFlow. All Rights Reserved.
				</Text>
			</footer>
		</div>
	);
};

export default VetFlowLandingPage;
